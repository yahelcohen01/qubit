import { Card } from '@/components/ui';
import type { Asset } from '@/types';
import { startCase } from 'lodash';

export const AssetCard = ({ asset }: { asset: Asset }) => {
  return (
    <Card
      content={asset.description}
      title={asset.title}
      size="md"
      animation="border"
      classes={{
        card: 'rounded-none h-auto min-h-[18rem] justify-normal w-full',
      }}
      header={
        <div className="text-sm text-gray-600 px-4 pt-4 flex items-center justify-between">
          <span>{startCase(asset.type)}</span>
          <span className="text-gray-600 font-light text-xs">
            {new Date(asset.date).toLocaleDateString()}
          </span>
        </div>
      }
      footer={
        <div className="flex flex-col p-4 gap-1 mt-auto">
          <div className="text-sm ">
            {asset.level},<br /> {asset.category}
          </div>
          <span className="flex items-center text-blue-600 hover:text-blue-800">
            <span className="">→</span>
          </span>
        </div>
      }
    />
  );
};
