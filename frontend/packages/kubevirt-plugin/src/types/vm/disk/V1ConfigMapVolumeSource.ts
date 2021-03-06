// tslint:disable
/**
 * KubeVirt API
 * This is KubeVirt API an add-on for Kubernetes.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: kubevirt-dev@googlegroups.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * ConfigMapVolumeSource adapts a ConfigMap into a volume. More info: https://kubernetes.io/docs/concepts/storage/volumes/#configmap
 * @export
 * @interface V1ConfigMapVolumeSource
 */
export interface V1ConfigMapVolumeSource {
  /**
   * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   * @type {string}
   * @memberof V1ConfigMapVolumeSource
   */
  name?: string;
  /**
   * Specify whether the ConfigMap or it\'s keys must be defined +optional
   * @type {boolean}
   * @memberof V1ConfigMapVolumeSource
   */
  optional?: boolean;
}
