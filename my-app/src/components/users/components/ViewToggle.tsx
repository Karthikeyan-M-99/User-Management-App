import React from 'react';
import { Radio, Tooltip } from 'antd';
import { TableOutlined, AppstoreOutlined } from '@ant-design/icons';

interface ViewToggleProps {
  isGridView: boolean;
  onChange: (isGrid: boolean) => void;
  padingStyles?: string;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ isGridView, onChange, padingStyles }) => {
  return (
    <Radio.Group 
      value={isGridView ? 'grid' : 'table'} 
      onChange={(e) => onChange(e.target.value === 'grid')}
      style={{ 
        border: 0,
        borderRadius: '2px',
        padding: padingStyles || '0 2px',
      }}
    >
      <Tooltip title="Table View">
        <Radio.Button 
          value="table"
          style={{ 
            padding: '5px 12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '2px 0 0 2px',
          }}
        >
          <TableOutlined style={{ fontSize: '16px' }} /> Table
        </Radio.Button>
      </Tooltip>
      <Tooltip title="Grid View">
        <Radio.Button 
          value="grid"
          style={{ 
            padding: '5px 12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '0 2px 2px 0',
          }}
        >
          <AppstoreOutlined style={{ fontSize: '16px' }} /> Grid
        </Radio.Button>
      </Tooltip>
    </Radio.Group>
  );
};