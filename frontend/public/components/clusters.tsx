/* eslint-disable no-unused-vars, no-undef */

import * as React from 'react';
import * as _ from 'lodash';

import { ColHead, DetailsPage, List, ListHeader, ListPage } from './factory';
import { Cog, detailsPage, navFactory, ResourceCog, Heading, ResourceLink, ResourceSummary } from './utils';
import { K8sFullyQualifiedResourceReference } from '../module/k8s';

export const ClusterReference: K8sFullyQualifiedResourceReference = 'Cluster:multicluster.coreos.com:v1alpha1';

const menuActions = [Cog.factory.ModifyLabels, Cog.factory.ModifyAnnotations, Cog.factory.Edit, Cog.factory.Delete];

const ClustersHeader = props => <ListHeader>
  <ColHead {...props} className="col-xs-4" sortField="metadata.name">Cluster Name</ColHead>
  <ColHead {...props} className="col-xs-3">Type</ColHead>
  <ColHead {...props} className="col-xs-5">Addresses</ColHead>
</ListHeader>;

const ClustersRow: React.StatelessComponent<ClustersRowProps> = ({obj}) => {
  const clusterLink = _.get(obj, ['metadata', 'annotations', 'multicluster.coreos.com/console-url']);
  const clusterType = _.get(obj, ['metadata', 'annotations', 'multicluster.coreos.com/directory']);

  return <div className="row co-resource-list__item">
    <div className="col-xs-4">
      <ResourceCog actions={menuActions} kind={ClusterReference} resource={obj} />
      <ResourceLink kind={ClusterReference} name={obj.metadata.name} namespace={undefined} title={obj.metadata.name} />
    </div>
    <div className="col-xs-3">
      { clusterType ? 'Directory': 'Replica' } Cluster
    </div>
    <div className="col-xs-5">
      {clusterLink
        ? <span className="text-muted">Console:&nbsp;
          <a href={clusterLink.toString()} target="_blank" rel="noopener noreferrer">{clusterLink} <i className="fa fa-external-link"></i></a>
        </span>
        : '—'
      }
    </div>
  </div>;
};

const ClustersDetails: React.StatelessComponent<ClustersDetailsProps> = ({obj}) => <div>
  <Heading text="Cluster Overview" />
  <div className="co-m-pane__body">
    <div className="row">
      <div className="col-sm-6 col-xs-12">
        <ResourceSummary resource={obj} showNodeSelector={false} showPodSelector={false} />
      </div>
    </div>
  </div>
</div>;

export const ClustersList: React.StatelessComponent = props => <List {...props} Header={ClustersHeader} Row={ClustersRow} />;

export const ClustersPage: React.StatelessComponent<ClustersPageProps> = props => <div>
  <div className="co-well" style={{marginBottom: 0}}>
    Thanks for trying out the Multi-Cluster Directory. Future updates will enable add/remove and other policy features. Feedback and questions are encouraged: <a href="mailto:tectonic-alpha-feedback@coreos.com">tectonic-alpha-feedback@coreos.com</a>
  </div>
  <ListPage {...props} title="Cluster Directory" kind={ClusterReference} ListComponent={ClustersList} canCreate={false} filterLabel={props.filterLabel} />
</div>;

const pages = [navFactory.details(detailsPage(ClustersDetails)), navFactory.editYaml()];

export const ClustersDetailsPage: React.StatelessComponent<ClustersDetailsPageProps> = props => {
  return <DetailsPage {...props} kind={ClusterReference} menuActions={menuActions} pages={pages} />;
};

export type ClustersRowProps = {
  obj: any,
};

export type ClustersDetailsProps = {
  obj: any,
};

export type ClustersPageProps = {
  filterLabel: string,
};

export type ClustersDetailsPageProps = {
  match: any,
};

ClustersRow.displayName = 'ClustersRow';
ClustersDetails.displayName = 'ClustersDetails';
ClustersList.displayName = 'ClustersList';
ClustersPage.displayName = 'ClustersPage';
ClustersDetailsPage.displayName = 'ClustersDetailsPage';
