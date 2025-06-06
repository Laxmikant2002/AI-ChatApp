import React from 'react';
import styled from 'styled-components';
import { FileWithPreview } from '../../utils/fileUpload';

interface FilePreviewProps {
  file: FileWithPreview;
  isUser: boolean;
}

const PreviewContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: ${({ theme, $isUser }) =>
    $isUser ? theme.background.accent : theme.background.secondary};
  border-radius: var(--radius-lg);
  max-width: 300px;
  transition: transform ${({ theme }) => theme.animations.transition.base};

  &:hover {
    transform: ${({ theme }) => theme.animations.scale.hover};
  }
`;

const FileIcon = styled.div<{ $isImage: boolean }>`
  width: ${props => props.$isImage ? '100px' : '40px'};
  height: ${props => props.$isImage ? '100px' : '40px'};
  flex-shrink: 0;
  border-radius: var(--radius-base);
  overflow: hidden;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: ${props => props.$isImage ? 'cover' : 'contain'};
  }
`;

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const FileName = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: ${({ theme }) => theme.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.div`
  font-size: var(--font-size-xs);
  color: ${({ theme }) => theme.text.secondary};
  margin-top: 0.25rem;
`;

const FileLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    text-decoration: none;
  }
`;

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FilePreview: React.FC<FilePreviewProps> = ({ file, isUser }) => {
  const isImage = file.type.startsWith('image/');

  return (
    <FileLink href={file.preview} target="_blank" rel="noopener noreferrer">
      <PreviewContainer $isUser={isUser}>
        <FileIcon $isImage={isImage}>
          <img
            src={file.preview || `/icons/${file.type.split('/')[1]}.svg`}
            alt={file.name}
          />
        </FileIcon>
        <FileInfo>
          <FileName>{file.name}</FileName>
          <FileSize>{formatFileSize(file.size)}</FileSize>
        </FileInfo>
      </PreviewContainer>
    </FileLink>
  );
};

export default FilePreview; 