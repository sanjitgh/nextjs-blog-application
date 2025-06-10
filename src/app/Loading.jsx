import LoadingSpinerIcon from "./components/LoadingSpinerIcon";

export default function Loading() {
  return (
    <div className='flex justify-center items-center min-h-[500px]'>
      <LoadingSpinerIcon color={"#4d6bfe"} />
    </div>
  );
}
