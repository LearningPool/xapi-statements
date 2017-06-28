import CreateAttachmentsOptions from './CreateAttachmentsOptions';
import GetAttachmentOptions from './GetAttachmentOptions';

interface StorageRepo {
  // Attachment functions.
  createAttachments: (opts: CreateAttachmentsOptions) => Promise<void>;
  getAttachment: (opts: GetAttachmentOptions) => Promise<NodeJS.ReadableStream>;

  // Repo-wide functions.
  clearRepo: () => Promise<void>;
  migrate: () => Promise<void>;
  rollback: () => Promise<void>;
}

export default StorageRepo;
