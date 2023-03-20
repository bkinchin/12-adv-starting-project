import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

const ErrorPage = () => {
  const error = useRouteError();
  //console.log('hi');
  //console.log(error);
  let title = "An error occured!";
  let message = "Something went wrong!!!";

  //console.log(error.status);
  //console.log(error.data.message);

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <main>
        <PageContent title={title}>
          <p>{message}</p>
        </PageContent>
      </main>
    </>
  );
};

export default ErrorPage;
