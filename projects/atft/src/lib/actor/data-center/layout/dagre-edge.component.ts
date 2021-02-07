import {Component} from '@angular/core';
import {MeshLineConnectorComponent} from '../../../object';
import {provideParent} from '../../../util';
import * as THREE from 'three';

@Component({
  selector: 'atft-dagre-edge',
  providers: [provideParent(DagreEdgeComponent)],
  template: '<ng-content></ng-content>'
})
export class DagreEdgeComponent extends MeshLineConnectorComponent {

  public positions: Array<number>;

  public animated = true;


  protected getLineGeometry(): THREE.BufferGeometry {
    if (!this.source || !this.target) {
      throw new Error('DagreCompositionComponent: source or target inputs are missing!');
    }
    // console.log('DagreCompositionComponent.getLineGeometry', this.positions);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    return geometry;
  }

}