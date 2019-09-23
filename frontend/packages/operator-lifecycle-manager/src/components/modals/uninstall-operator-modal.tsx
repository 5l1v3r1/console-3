import * as React from 'react';
import * as _ from 'lodash';
import {
  createModalLauncher,
  ModalTitle,
  ModalBody,
  ModalSubmitFooter,
} from '@console/internal/components/factory/modal';
import {
  history,
  resourceListPathFromModel,
  withHandlePromise,
} from '@console/internal/components/utils';
import { K8sKind, K8sResourceKind } from '@console/internal/module/k8s';
import { getActiveNamespace } from '@console/internal/actions/ui';
import { SubscriptionKind } from '../../types';
import { ClusterServiceVersionModel, SubscriptionModel } from '../../models';

export const UninstallOperatorModal = withHandlePromise((props: UninstallOperatorModalProps) => {
  const [deleteCSV, setDeleteCSV] = React.useState(true);

  const submit = (event) => {
    event.preventDefault();

    const { subscription, k8sKill } = props;
    const deleteOptions = {
      kind: 'DeleteOptions',
      apiVersion: 'v1',
      propagationPolicy: 'Foreground',
    };
    const promises = [k8sKill(SubscriptionModel, subscription, {}, deleteOptions)].concat(
      _.get(subscription, 'status.installedCSV') && deleteCSV
        ? k8sKill(
            ClusterServiceVersionModel,
            {
              metadata: {
                name: subscription.status.installedCSV,
                namespace: subscription.metadata.namespace,
              },
            },
            {},
            deleteOptions,
          ).catch(() => Promise.resolve())
        : [],
    );

    props
      .handlePromise(Promise.all(promises))
      .then(() => {
        props.close();

        if (
          window.location.pathname.split('/').includes(subscription.metadata.name) ||
          window.location.pathname.split('/').includes(subscription.status.installedCSV)
        ) {
          history.push(resourceListPathFromModel(ClusterServiceVersionModel, getActiveNamespace()));
        }
      })
      .catch(_.noop);
  };

  return (
    <form onSubmit={submit} name="form" className="modal-content co-catalog-install-modal">
      <ModalTitle className="modal-header">Remove Operator Subscription</ModalTitle>
      <ModalBody>
        <div>
          <p>
            This will remove the subscription from <i>{props.subscription.metadata.namespace}</i>{' '}
            and the Operator will no longer receive updates.
          </p>
        </div>
        <div>
          <label className="co-delete-modal-checkbox-label">
            <input type="checkbox" checked={deleteCSV} onChange={() => setDeleteCSV(!deleteCSV)} />
            &nbsp;&nbsp;{' '}
            <strong>Also completely remove the Operator from the selected namespace.</strong>
          </label>
        </div>
      </ModalBody>
      <ModalSubmitFooter
        inProgress={props.inProgress}
        errorMessage={props.errorMessage}
        cancel={props.cancel}
        submitText="Remove"
      />
    </form>
  );
});

export const createUninstallOperatorModal = createModalLauncher(UninstallOperatorModal);

export type UninstallOperatorModalProps = {
  handlePromise: <T>(promise: Promise<T>) => Promise<T>;
  inProgress: boolean;
  errorMessage: string;
  cancel?: () => void;
  close?: () => void;
  k8sKill: (kind: K8sKind, resource: K8sResourceKind, options: any, json: any) => Promise<any>;
  k8sGet: (kind: K8sKind, name: string, namespace: string) => Promise<K8sResourceKind>;
  k8sPatch: (
    kind: K8sKind,
    resource: K8sResourceKind,
    data: { op: string; path: string; value: any }[],
  ) => Promise<any>;
  subscription: SubscriptionKind;
};

UninstallOperatorModal.displayName = 'UninstallOperatorModal';