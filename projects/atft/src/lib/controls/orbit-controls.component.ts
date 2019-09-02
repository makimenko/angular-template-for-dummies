import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {AbstractCamera} from '../cameras/abstract-camera';

@Component({
  selector: 'atft-orbit-controls',
  template: `<ng-content></ng-content>`,
  styleUrls: ['orbit-controls.component.scss']
})
export class OrbitControlsComponent implements AfterViewInit, OnChanges, OnDestroy {

  @ContentChildren(AbstractCamera, { descendants: true }) childCameras: QueryList<AbstractCamera<THREE.Camera>>;

  /**
   * The element on whose native element the orbit controls will listen for mouse events.
   *
   * Note that keyboard events are still listened for on the global window object, this is
   * a known issue from Three.js: https://github.com/mrdoob/three.js/pull/10315
   *
   * @example This property can be used to restrict the orbit controls (i.e. the
   * area which is listened for mouse move and zoom events) to the rendering pane:
   * ```
   * <three-orbit-controls [listeningControlElement]=mainRenderer.renderPane>
   *   <three-renderer #mainRenderer>
   *     ...
   *   </three-renderer>
   * </three-orbit-controls>
   * ```
   */
  @Input() listeningControlElement: ElementRef | undefined = undefined;

  @Input() rotateSpeed = 1.0;
  @Input() zoomSpeed = 1.2;

  @Output() render = new EventEmitter<void>();

  private controls: OrbitControls;

  constructor() {
    console.log('OrbitControlsComponent.constructor');
  }

  ngOnChanges(changes: SimpleChanges) {
    // If the THREE.js OrbitControls are not set up yet, we do not need to update
    // anything as they will pick the new values from the @Input properties automatically
    // upon creation.
    if (!this.controls) {
      return;
    }

    if (changes['rotateSpeed']) {
      this.controls.rotateSpeed = this.rotateSpeed;
    }
    if (changes['zoomSpeed']) {
      this.controls.zoomSpeed = this.zoomSpeed;
    }
    if (changes['listeningControlElement']) {
      // The DOM element the OrbitControls listen on cannot be changed once an
      // OrbitControls object is created. We thus need to recreate it.
      this.controls.dispose();
      this.setUpOrbitControls();
    }
  }

  ngOnDestroy() {
    if (this.controls) {
      this.controls.dispose();
    }
  }

  private setUpOrbitControls() {
    this.controls = new OrbitControls(
      this.childCameras.first.camera,
      this.listeningControlElement && this.listeningControlElement.nativeElement
    );
    this.controls.rotateSpeed = this.rotateSpeed;
    this.controls.zoomSpeed = this.zoomSpeed;

    this.controls.addEventListener('change', () => {
      this.render.emit();
    });
    this.render.emit();
  }

  ngAfterViewInit(): void {
    console.log('OrbitControlsComponent.ngAfterViewInit');
    if (this.childCameras === undefined || this.childCameras.first === undefined) {
      throw new Error('Camera is not found');
    }

    this.setUpOrbitControls();
  }

}
