import { Suspense } from "react";
import {
  Await,
  defer,
  json,
  Link,
  redirect,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventsDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading.1..</p>}>
        <Await resolve={event}>
          {(loadedEvent) => {
            return <EventItem event={loadedEvent} />;
          }}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => {
            return <EventsList events={loadedEvents} />;
          }}
        </Await>
      </Suspense>
      <p>
        <Link to=".." relative="path">
          Go Back
        </Link>
      </p>
    </>
  );
};

export default EventsDetailPage;

const loadEvent = async (id) => {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selcted event." },
      { status: 500 }
    );
  } else {
    //return response;
    const resData = await response.json();
    return resData.event;
  }
};

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
    const resData = await response.json();
    //console.log(resData.events);
    return resData.events;
    //return response;
  }
};

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export const action = async ({ params, request }) => {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }
  return redirect("/events");
};
