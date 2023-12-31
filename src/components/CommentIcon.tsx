import Icon, {
  CustomIconComponentProps,
} from '@ant-design/icons/lib/components/Icon'

const CommentSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M6 14h12v-2H6v2Zm0-3h12V9H6v2Zm0-3h12V6H6v2Zm16 14l-4-4H4q-.825 0-1.413-.588T2 16V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v18ZM4 16V4v12Zm14.85 0L20 17.125V4H4v12h14.85Z"
    ></path>
  </svg>
)

const CommentIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={CommentSvg} {...props} />
)

export default CommentIcon
