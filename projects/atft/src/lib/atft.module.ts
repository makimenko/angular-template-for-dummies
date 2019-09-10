import {NgModule} from '@angular/core';

import {OrbitControlsComponent} from './controls/orbit-controls.component';
import {ObjLoaderComponent} from './objects/loaders/obj-loader.component';
import {Rad2DegPipe} from './pipes/rad2deg.pipe';
import {Deg2RadPipe} from './pipes/deg2rad.pipe';
import {PerspectiveCameraComponent} from './cameras/perspective-camera.component';
import {WebGLRendererComponent} from './renderer/webgl-renderer.component';
import {SceneComponent} from './objects/scene.component';
import {AxesHelperComponent} from './objects/helpers/axes-helper.component';
import {GridHelperComponent} from './objects/helpers/grid-helper.component';
import {ObjectLoaderComponent} from './objects/loaders/object-loader.component';
import {PointLightComponent} from './objects/light/point-light.component';
import {SphereMeshComponent} from './objects/mesh/sphere-mesh.component';
import {CylinderMeshComponent} from './objects/mesh/cylinder-mesh.component';
import {TorusMeshComponent} from './objects/mesh/torus-mesh.component';
import {EmptyComponent} from './objects/helpers/empty.component';
import {BoxMeshComponent} from './objects/mesh/box-mesh.component';
import {TextMeshComponent} from './objects/text/text-mesh.component';
import {MeshLineConnectorComponent} from './objects/connector/mesh-line-connector.component';
import {LineConnectorComponent} from './objects/connector/line-connector.component';
import {HemisphereLightComponent} from './objects/light/hemisphere-light.component';
import {DirectionalLightComponent} from './objects/light/directional-light.component';
import {PlaneMeshComponent} from './objects/mesh/plane-mesh.component';
import {FrameMeshComponent} from './objects/mesh/frame-mesh.component';
import {SVGLoaderComponent} from './objects/loaders/svg-loader.component';

// NOTE: In case of "ERROR in Unexpected value 'undefined' exported by the module 'AtftModule" fix imports (do not import index.ts)

@NgModule({
  imports: [],
  declarations: [
    OrbitControlsComponent,
    ObjLoaderComponent,
    Rad2DegPipe,
    Deg2RadPipe,
    PerspectiveCameraComponent,
    WebGLRendererComponent,
    SceneComponent,
    AxesHelperComponent,
    GridHelperComponent,
    ObjectLoaderComponent,
    PointLightComponent,
    CylinderMeshComponent,
    TorusMeshComponent,
    SphereMeshComponent,
    EmptyComponent,
    BoxMeshComponent,
    TextMeshComponent,
    MeshLineConnectorComponent,
    LineConnectorComponent,
    HemisphereLightComponent,
    DirectionalLightComponent,
    PlaneMeshComponent,
    FrameMeshComponent,
    SVGLoaderComponent
  ],
  exports: [
    OrbitControlsComponent,
    ObjLoaderComponent,
    Rad2DegPipe,
    Deg2RadPipe,
    PerspectiveCameraComponent,
    WebGLRendererComponent,
    SceneComponent,
    AxesHelperComponent,
    GridHelperComponent,
    ObjectLoaderComponent,
    PointLightComponent,
    CylinderMeshComponent,
    TorusMeshComponent,
    SphereMeshComponent,
    EmptyComponent,
    BoxMeshComponent,
    TextMeshComponent,
    MeshLineConnectorComponent,
    LineConnectorComponent,
    HemisphereLightComponent,
    DirectionalLightComponent,
    PlaneMeshComponent,
    FrameMeshComponent,
    SVGLoaderComponent
  ]
})
export class AtftModule {
}