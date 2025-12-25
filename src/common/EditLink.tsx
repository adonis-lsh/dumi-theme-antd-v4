import { EditOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { FormattedMessage, useIntl, useRouteMeta } from 'dumi';
import useAdditionalThemeConfig from '../hooks/useAdditionalThemeConfig';

const editLinkStyle = css`
  color: #1677ff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.3s;

  &:hover {
    color: #1677ff;
    text-decoration: none;
    opacity: 0.8;
  }

  .anticon {
    color: #1677ff;
    transition: color 0.3s;
  }

  &:hover .anticon {
    color: #1677ff;
    opacity: 0.8;
  }
`;

const EditLink = () => {
  const { frontmatter } = useRouteMeta();
  const { editLink } = useAdditionalThemeConfig();
  const intl = useIntl();

  const showEditLink = editLink && frontmatter.filename;
  return showEditLink ? (
    <div>
      <a
        target="_blank"
        href={`${intl.formatMessage(
          { id: '$internal.edit.link' },
          { filename: frontmatter.filename }
        )}`}
        rel="noreferrer"
        css={editLinkStyle}
      >
        <EditOutlined />
        <FormattedMessage id="app.footer.actions.edit" />
      </a>
    </div>
  ) : null;
};

export default EditLink;
