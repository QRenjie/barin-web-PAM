'use client';

import { Button, Form, Input, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import type { HomeI18nInterface } from '@config/i18n-mapping/HomeI18n';
import type { ProjectAsset, ProjectEnvironment } from '@interfaces/ProjectAsset';
import type { ProjectUpsertInput } from '@schemas/ProjectSchema';
import { projectAssetTheme } from './projectAssetTheme';

export type ProjectFormValues = {
  name: string;
  author: string;
  description?: string;
  otherInfo?: string;
  repoUrl?: string;
  environments?: ProjectEnvironment[];
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
    environments: project.environments.map((e) => ({ ...e })),
    tagsText: (project.tags ?? []).join(', ')
  };
}

function formValuesToUpsert(values: ProjectFormValues): ProjectUpsertInput {
  const tags = (values.tagsText ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const environments = (values.environments ?? [])
    .map((e) => ({
      name: e.name?.trim() ?? '',
      url: e.url?.trim() ?? ''
    }))
    .filter((e) => e.name && e.url);

  return {
    name: values.name.trim(),
    author: values.author.trim(),
    description: values.description?.trim() ?? '',
    otherInfo: values.otherInfo?.trim() ?? '',
    repoUrl: values.repoUrl?.trim() || undefined,
    environments,
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
      form.setFieldsValue({ environments: [] });
    }
  }, [open, editing, form]);

  const inputClass = projectAssetTheme.formInput;

  return (
    <Modal
      title={editing ? tt.modalEditTitle : tt.modalAddTitle}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={saving}
      okText={tt.modalSave}
      cancelText={tt.modalCancel}
      width={720}
      destroyOnClose
      className={projectAssetTheme.formModal}
    >
      <Form
        form={form}
        layout="vertical"
        className={`${projectAssetTheme.formRoot} mt-2`}
        onFinish={(values) => onSubmit(formValuesToUpsert(values))}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Form.Item
            name="name"
            label={tt.formName}
            rules={[{ required: true, message: tt.formRequired }]}
          >
            <Input className={inputClass} />
          </Form.Item>
          <Form.Item
            name="author"
            label={tt.formAuthor}
            rules={[{ required: true, message: tt.formRequired }]}
          >
            <Input className={inputClass} />
          </Form.Item>
        </div>
        <Form.Item name="description" label={tt.formDescription}>
          <Input.TextArea rows={2} className={inputClass} />
        </Form.Item>
        <Form.Item name="otherInfo" label={tt.formOtherInfo}>
          <Input className={inputClass} />
        </Form.Item>
        <Form.Item name="repoUrl" label={tt.formRepoUrl}>
          <Input className={inputClass} placeholder="https://..." />
        </Form.Item>

        <div className="mb-1 text-sm font-medium text-primary-text">
          {tt.formEnvironments}
        </div>
        <p className="text-xs text-tertiary-text mb-3">{tt.formEnvironmentsHint}</p>
        <Form.List name="environments">
          {(fields, { add, remove }) => (
            <div className="space-y-3">
              {fields.map((field) => (
                <div
                  key={field.key}
                  className="grid grid-cols-1 sm:grid-cols-[minmax(0,7rem)_1fr_auto] gap-2 items-start project-asset-muted-box rounded-lg p-3"
                >
                  <Form.Item
                    name={[field.name, 'name']}
                    label={tt.formEnvName}
                    className="mb-0"
                    rules={[
                      {
                        validator: async (_, name: string | undefined) => {
                          const url = form.getFieldValue([
                            'environments',
                            field.name,
                            'url'
                          ]) as string | undefined;
                          if (!name?.trim() && !url?.trim()) return;
                          if (!name?.trim()) {
                            throw new Error(tt.formRequired);
                          }
                        }
                      }
                    ]}
                  >
                    <Input
                      className={inputClass}
                      placeholder={tt.formEnvNamePlaceholder}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'url']}
                    label={tt.formEnvUrl}
                    className="mb-0"
                    rules={[
                      {
                        validator: async (_, url: string | undefined) => {
                          const name = form.getFieldValue([
                            'environments',
                            field.name,
                            'name'
                          ]) as string | undefined;
                          if (!name?.trim() && !url?.trim()) return;
                          if (!url?.trim()) {
                            throw new Error(tt.formRequired);
                          }
                          if (!/^https?:\/\/.+/i.test(url.trim())) {
                            throw new Error(tt.formEnvUrlInvalid);
                          }
                        }
                      }
                    ]}
                  >
                    <Input
                      className={inputClass}
                      placeholder="https://..."
                    />
                  </Form.Item>
                  <Button
                    type="text"
                    danger
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(field.name)}
                    className="sm:mt-[30px]"
                    aria-label={tt.formRemoveEnvironment}
                  />
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add({ name: '', url: '' })}
                icon={<PlusOutlined />}
                block
              >
                {tt.formAddEnvironment}
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item name="tagsText" label={tt.formTags} className="mt-4">
          <Input
            className={inputClass}
            placeholder={tt.formTagsPlaceholder}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
