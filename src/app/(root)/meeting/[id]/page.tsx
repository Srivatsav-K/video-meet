type MeetingParams = {
  id?: string;
};
type MeetingProps = {
  params: MeetingParams;
};
const Meeting = ({ params: { id } }: MeetingProps) => {
  return <div>Meeting room : #{id}</div>;
};
export default Meeting;
