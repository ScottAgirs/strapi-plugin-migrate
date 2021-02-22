import styled from 'styled-components';
import React, { useState } from 'react';
import { request } from 'strapi-helper-plugin';
import { Button } from '@buffetjs/core';

import Box from '../layout/Box';
import CardWidget from '../data-display/CardWidget';

import downloadNamedJson from '../../utils/downloadNamedJson';
import ShowMoreCollapse from '../data-display/ShowMoreCollapse';

const StyledCardWidgetFile = styled(CardWidget)`
  &:before {
    content: '\f56d';
    color: #d6d6d6;
  }
`;

export const ExportButton = () => {
  const handlePermissionsDownload = async () => {
    try {
      const userRoles = await request(`/migrate/getPermissionsJSON`);
      downloadNamedJson(userRoles, 'user-permissions-strapi-migrate');
      strapi.notification.toggle({
        message: 'User permissions exported successfully.',
        timeout: 3500,
        title: 'Woohoo! 🥳',
        type: 'success',
      });
    } catch (err) {
      strapi.notification.toggle({
        message: err.toString(),
        timeout: 3500,
        title: 'Holy guacamole!',
        type: 'warning',
      });
    }
  };

  return (
    <Box my="20px" id="download">
      <Button
        color="primary"
        label="Download "
        onClick={handlePermissionsDownload}
      />
    </Box>
  );
};

const ExportPermissionsFile = () => {
  return (
    <StyledCardWidgetFile variant="accent">
      <h3>Export as a file</h3>
      <p>Clicking the button will download a JSON file.</p>

      <ExportButton />

      <ShowMoreCollapse openLabel="Details">
        <div style={{ paddingTop: 16 }}>
          <p>
            Exports JSON file that you can save on your computer or external
            storage.
          </p>
        </div>
      </ShowMoreCollapse>
    </StyledCardWidgetFile>
  );
};

export default ExportPermissionsFile;
