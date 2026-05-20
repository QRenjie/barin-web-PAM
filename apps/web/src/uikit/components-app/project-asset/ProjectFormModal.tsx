'use client';

import { Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import type { HomeI18nInterface } from '@config/i18n-mapping/HomeI18n';
import type { ProjectAsset } from '@interfaces/ProjectAsset';
import type { ProjectUpsertInput } from '@schemas/ProjectSchema';

export type ProjectFormValues = {
  name: string;
  author: string;
  description?: string;
  otherInfo?: string;
  repoUrl?: string;
  testUrl?: string;
  prodUrl?: string;
  tagsText?: string;
};

type ProjectFormModalProps = {
  open: boolean;
  editing: ProjectAsset | null;
  tt: HomeI18nInterface;
  saving: boolean;
  onCancel: () => void;
  onSubmit: (values: ProjectUpsertInput) => void;
};

function assetToFormValues(project: ProjectAsset): ProjectFormValues {
  return {
    name: project.name,
    author: project.author,
    description: project.description,
    otherInfo: project.otherInfo,
    repoUrl: project.repoUrl ?? '',
    testUrl: project.testUrl ?? '',
    prodUrl: project.prodUrl ?? '',
    tagsText: (project.tags ?? []).join(', ')
  };
}

function formValuesToUpsert(values: ProjectFormValues): ProjectUpsertInput {
  const tags = (values.tagsText ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  return {
    name: values.name.trim(),
    author: values.author.trim(),
    description: values.description?.trim() ?? '',
    otherInfo: values.otherInfo?.trim() ?? '',
    repoUrl: values.repoUrl?.trim() || undefined,
    testUrl: values.testUrl?.trim() || undefined,
    prodUrl: values.prodUrl?.trim() || undefined,
    tags
  };
}

export function ProjectFormModal({
  open,
  editing,
  tt,
  saving,
  onCancel,
  onSubmit
}: ProjectFormModalProps) {
  const [form] = Form.useForm<ProjectFormValues>();

  useEffect(() => {
    if (!open) return;
    if (editing) {
      form.setFieldsValue(assetToFormValues(editing));
    } else {
      form.resetFields();
    }
  }, [open, editing, form]);

  return (
    <Modal
      title={editing ? tt.modalEditTitle : tt.modalAddTitle}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={saving}
      okText={tt.modalSave}
      cancelText={tt.modalCancel}
      width={640}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        className="mt-2"
        onFinish={(values) => onSubmit(formValuesToUpsert(values))}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Form.Item
            name="name"
            label={tt.formName}
            rules={[{ required: true, message: tt.formRequired }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="author"
            label={tt.formAuthor}
            rules={[{ required: true, message: tt.formRequired }]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item name="description" label={tt.formDescription}>
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="otherInfo" label={tt.formOtherInfo}>
          <Input />
        </Form.Item>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Form.Item name="repoUrl" label={tt.formRepoUrl}>
            <Input placeholder="https://..." />
          </Form.Item>
          <Form.Item name="testUrl" label={tt.formTestUrl}>
            <Input placeholder="https://test..." />
          </Form.Item>
        </div>
        <Form.Item name="prodUrl" label={tt.formProdUrl}>
          <Input placeholder="https://..." />
        </Form.Item>
        <Form.Item name="tagsText" label={tt.formTags}>
          <Input placeholder={tt.formTagsPlaceholder} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
