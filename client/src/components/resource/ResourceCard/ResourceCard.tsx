import { Checkbox } from 'antd';
import * as React from 'react';
import { IResource, ResourceType } from '../../../models';

const ResourceNameMap = {
  [ResourceType.GoogleDriveFileResource]: 'Google Drive File'
}

const ResourceDescriptionMap = {
  [ResourceType.GoogleDriveFileResource]: ''
}

interface IProps {
  resource: IResource;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => any;
}

const ResourceCard: React.SFC<IProps> = ({ 
  resource,
  selectable = false,
  selected,
  onSelect
}) => (
  <div>
    {
      selectable &&
      <Checkbox
        checked={selected}
        onChange={onSelect}
      />
    }
    <b>{ResourceNameMap[resource.type]}: {resource.name}</b>
    <span>{ResourceDescriptionMap[resource.type]}</span>
  </div>
);

export default ResourceCard;
