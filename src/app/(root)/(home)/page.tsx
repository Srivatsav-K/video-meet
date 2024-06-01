import CurrentTimeAndDate from "@/components/CurrentTimeAndDate";
import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="bg-hero h-[300px] w-full rounded-[20px]">
        <div className="flex h-full flex-col justify-between max-lg:px-5 max-lg:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming meeting at 12:30 PM
          </h2>

          <div className="flex flex-col gap-2">
            <CurrentTimeAndDate />
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};
export default Home;
