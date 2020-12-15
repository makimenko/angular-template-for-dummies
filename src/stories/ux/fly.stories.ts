import {moduleMetadata} from '@storybook/angular';
// NOTE: Do direct import instead of library (allows to watch component and easy to develop)
import {AtftModule} from '../../../projects/atft/src/lib/atft.module';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AnimationService} from '../../../projects/atft/src/lib/animation';
import {EmptyComponent} from '../../../projects/atft/src/lib/object/helper';
import {UxActorModule} from '../../../projects/atft/src/lib/actor/ux';

const modelPath = 'https://raw.githubusercontent.com/makimenko/files/master/angular-template-for-threejs/model/';
// const modelPath = '/assets/model';
const longText = `Coding allow us to construct and visit believable imaginary cities,
provide us with glimpses of ancient urbanism, and let us immerse ourselves
in the wildest utopias and darkest dystopias of our possible futures.
They are an unprecedented canvas for experimenting with the urban environment,
and an utterly unique medium for experiencing cities both imagined
and real in truly immersive ways.`;

@Component({
  template: `
    <atft-renderer-canvas>
      <atft-perspective-camera [zAxisUp]="true" positionX=0 positionY=50 [positionZ]=z>
      </atft-perspective-camera>

      <!-- Foreground -->
      <atft-scene name="scene" background="0x000000" atft-stats-auto-show>

        <atft-ambient-light color="0xFFFFFF" intensity="0.4"></atft-ambient-light>

        <atft-point-light intensity="0.5" distance="1000" translateX=90 translateY=90
                          translateZ=90></atft-point-light>
        <atft-point-light intensity="0.8" distance="1000" [translateX]="-60" [translateY]="-60"
                          [translateZ]="50"></atft-point-light>

        <atft-text-actor text="Introducing Angular Template for Three.js" translateX="-200" translateY="50" translateZ="-50"
                         [animate]="false" [minDelay]="5" [maxDelay]="5" [materialColor]="colorA200"
                         [scaleX]="0.5" [scaleY]="0.5"
                         atft-dashed-draw [dashColor]="colorA200" [dashIncrement]="5">
        </atft-text-actor>

        <atft-text-actor text="Hello, virtual city!" translateX="100" translateY="5" [translateZ]="-100"
                         [animate]="false" [minDelay]="10" [maxDelay]="10" [materialColor]="colorA200"
                         atft-dashed-draw [dashColor]="colorA200" [dashIncrement]="5">
        </atft-text-actor>

        <atft-text-actor text="${longText}" translateX="-50" [translateY]="100" [translateZ]="-50"
                         [animate]="false" [minDelay]="10" [maxDelay]="10" [materialColor]="colorA200"
                         [scaleX]="0.3" [scaleY]="0.3" [dashIncrement]="50"
                         atft-dashed-draw [dashColor]="colorA200">
        </atft-text-actor>

        <atft-obj-loader
          model="${modelPath}/SampleArea/Base.obj"
          material="${modelPath}/SampleArea/Base.mtl"
          resourcePath="${modelPath}/">
        </atft-obj-loader>

        <atft-obj-loader atft-dashed-draw dashColor="0x303030" [dashIncrement]="150" [initialOpacity]="0.2" [targetOpacity]="0.21"
                         model="${modelPath}/SampleArea/Zone.obj"
                         material="${modelPath}/SampleArea/Zone.mtl"
                         resourcePath="${modelPath}/">
        </atft-obj-loader>

        <atft-obj-loader *ngFor="let item of [].constructor(5); let i = index"
                         atft-dashed-draw dashColor="0x303030" [dashIncrement]="20+(5*i)" [initialOpacity]="0.1" [targetOpacity]="0.2"
                         model="${modelPath}/SampleArea/House{{i+1}}.obj"
                         material="${modelPath}/SampleArea/House{{i+1}}.mtl"
                         resourcePath="${modelPath}/">
        </atft-obj-loader>

      </atft-scene>
    </atft-renderer-canvas>
  `
})
class StorybookFlyComponent implements AfterViewInit {

  @ViewChild(EmptyComponent) box;

  k = 0;
  z = 600;

  colorA200 = 0x9FA8DA;

  constructor(private animationService: AnimationService) {
  }

  public ngAfterViewInit() {
    this.animate = this.animate.bind(this);
    this.animationService.animate.subscribe(this.animate);
    this.animationService.start();
  }

  public animate() {
    this.k += 0.001;

    if (this.z > 200) {
      this.z -= this.k;
    }
  }

}

export default {
  title: 'UX / Fly',
  decorators: [
    moduleMetadata({
      imports: [
        AtftModule,
        UxActorModule
      ]
    })
  ],
  args: {},
  argTypes: {}
};

export const Fly = (args) => ({
  component: StorybookFlyComponent,
  props: args
});
