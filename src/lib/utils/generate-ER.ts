import { Direction, Flags, Format, TypeormUml } from 'typeorm-uml';
import { dataSource } from '../../database/config/ormconfig.default';

const createEDR = async () => {
  const flags: Flags = {
    direction: Direction.LR,
    format: Format.SVG,
    handwritten: true,
    download: 'docs/ERD.svg',
  };

  const typeormUml = new TypeormUml();
  await typeormUml.build(dataSource, flags);
};
createEDR();
