import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventPage() {
  const { events } = useLoaderData();
  //   if (data.isError) {
  //     return <p>{data.message}</p>;
  //   }
  // const fetchedEvents = data.events;

  // return <EventsList events={fetchedEvents} />;
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => {
          return <EventsList events={loadedEvents} />;
        }}
      </Await>
    </Suspense>
  );
}

export default EventPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //...
    //return { isError: true, message: "Could not fetch events." };
    // throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //   status: 500,
    // });
    // return json(
    //   { message: "Could not fetch events" },
    //   {
    //     status: 500,
    //   }
    // );
    throw json(
      { message: "Could not fetch events" },
      {
        status: 500,
      }
    );
  } else {
    //console.log("hi");
    const resData = await response.json();
    //console.log(resData.events);
    return resData.events;
    //return response;
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
