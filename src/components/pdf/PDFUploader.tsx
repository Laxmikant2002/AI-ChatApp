import React, { useCallback } from 'react';
import styled from 'styled-components';
import { PDFFile } from '../../types';

const UploaderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const UploadArea = styled.div`
  border: 2px dashed #ccc;
  border-radius: 1rem;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #f8f9fa;

  &:hover {
    border-color: #666;
    background-color: #f1f3f5;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #666;
`;

const UploadText = styled.p`
  margin: 0;
  color: #666;
  font-size: 1rem;
`;

const PDFUploader: React.FC = () => {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    const pdfFiles: PDFFile[] = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }));
    console.log('PDF Files:', pdfFiles);
  };

  return (
    <UploaderContainer>
      <UploadArea
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <FileInput
          type="file"
          accept=".pdf"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <UploadIcon>📄</UploadIcon>
        <UploadText>
          Drag and drop your PDF here or click to browse
        </UploadText>
      </UploadArea>
    </UploaderContainer>
  );
};

export default PDFUploader; 