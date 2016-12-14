import model3bas from './Images/model3bas.jpg';
import model3lux from './Images/model3lux.jpg';
import model3exo from './Images/model3exo.jpg';
import modelXbas from './Images/modelXbas.jpg';
import modelXlux from './Images/modelXlux.jpg';
import modelXexo from './Images/modelXexo.jpg';
import modelSbas from './Images/modelSbas.jpg';
import modelSlux from './Images/modelSlux.jpg';
import modelSexo from './Images/modelSexo.jpg';
import powerwall from './Images/powerwall.jpg';

export default function getCarImages(car){
  let cars = {
    model3bas,
    model3lux,
    model3exo,
    modelXbas,
    modelXlux,
    modelXexo,
    modelSbas,
    modelSlux,
    modelSexo,
    powerwall,
  }
  return cars[car]
}
