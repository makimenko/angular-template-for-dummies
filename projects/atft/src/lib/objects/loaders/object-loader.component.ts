import {Component, forwardRef} from '@angular/core';
import {AbstractObject3D} from '../abstract-object-3d';
import {AbstractModelLoader} from './abstract-model-loader';

import * as THREE from 'three';

@Component({
  selector: 'atft-object-loader',
  providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => ObjectLoaderComponent) }],
  template: '<ng-content></ng-content>'
})
export class ObjectLoaderComponent extends AbstractModelLoader {
  private loader = new THREE.ObjectLoader();

  protected async loadModelObject() {
    return new Promise<THREE.Object3D>((resolve, reject) => {
      this.loader.load(this.model, model => {
          // TODO: it seems that some textures loaded after last render (and model has black texture instead)
          resolve(model);
        },
        undefined,
        reject
      );
    });
  }
}
