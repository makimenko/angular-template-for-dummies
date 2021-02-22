import {Injectable, OnDestroy} from '@angular/core';
import {SceneComponent} from '../object/scene.component';
import {AbstractCamera} from '../camera/abstract-camera';
import * as THREE from 'three';
import {StatsService} from '../stats/stats.service';
import {EffectComposerComponent} from '../effect';

@Injectable()
export class RendererService implements OnDestroy {

  private init = false;
  private scene: SceneComponent;
  private camera: AbstractCamera<any>;
  private webGlRenderer: THREE.WebGLRenderer;
  private aspect: number;

  private composer: EffectComposerComponent;

  constructor(
    private statsService: StatsService
  ) {

  }

  ngOnDestroy() {

  }


  public setScene(scene: SceneComponent) {
    this.scene = scene;
  }

  public setCamera(camera: AbstractCamera<any>) {
    this.camera = camera;
    this.camera.updateAspectRatio(this.aspect);
  }

  public render() {
    if (this.init && this.scene && this.scene.getObject() && this.camera && this.camera.camera) {
      // console.log('render');
      if (this.composer) {
        this.composer.render();
        if (!this.composer.renderToScreen) {
          this.webGlRenderer.render(this.scene.getObject(), this.camera.camera);
        }
      } else {
        this.webGlRenderer.render(this.scene.getObject(), this.camera.camera);
      }
      this.statsService.update();
    }
  }

  public initialize(canvas: HTMLCanvasElement) {
    // console.log('RendererComponent.initialize');
    this.webGlRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    this.webGlRenderer.setPixelRatio(window.devicePixelRatio);
    this.webGlRenderer.setSize(canvas.clientWidth, canvas.clientHeight, true);

    // this.scene.background = this.renderTarget.texture;

    // TODO: props
    this.webGlRenderer.shadowMap.enabled = false;
    this.webGlRenderer.shadowMap.autoUpdate = false;
    this.webGlRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.webGlRenderer.setClearColor(0x000000, 0);
    this.webGlRenderer.autoClear = true;
    canvas.style.zIndex = '2';

    // ------------------------------ END

    this.updateChildCamerasAspectRatio(canvas);
    this.init = true;
    this.render();
  }


  public resize(canvas: HTMLCanvasElement, size: string) {
    canvas.style.width = size;
    canvas.style.height = size;
    canvas.style.border = 'none';
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.webGlRenderer.setSize(width, height, true);

    this.updateChildCamerasAspectRatio(canvas);
    this.render();
  }

  private calculateAspectRatio(canvas: HTMLCanvasElement) {
    const height = canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    this.aspect = canvas.clientWidth / canvas.clientHeight;
  }

  private updateChildCamerasAspectRatio(canvas: HTMLCanvasElement) {
    this.calculateAspectRatio(canvas);
    if (this.camera) {
      this.camera.updateAspectRatio(this.aspect);
    }
  }

  public getScene() {
    return this.scene;
  }

  public getCamera() {
    return this.camera;
  }

  public getWebGlRenderer() {
    return this.webGlRenderer;
  }

  public setComposer(composer: EffectComposerComponent) {
    this.composer = composer;
  }


}
