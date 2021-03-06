import {Injectable} from '@angular/core';
import {AbstractAssetService, BaseAssetSource} from './abstract-asset.service';


@Injectable()
export class ModelService extends AbstractAssetService<BaseAssetSource> {

  defaultProvider = '3d';

  protected init() {
    this.registerProvider('3d', {
      url: 'https://raw.githubusercontent.com/makimenko/files/master/actor-models/?.obj'
    });
  }

  defaultIfNotFound(icon: string): BaseAssetSource {
    return {
      url: icon
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getFinalResult(finalUrl: string, provider: BaseAssetSource): BaseAssetSource {
    return {
      url: finalUrl
    };
  }

}
