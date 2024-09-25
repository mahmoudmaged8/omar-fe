import { PlusCircleIcon } from "@heroicons/react/24/outline";
import SurveyListItem from "../Components/SurveyListItem";
import TButton from "../Components/core/TButton";
import PageComponent from "../Components/pageComponent";
import { UserStateContext } from "../contexts/ContextProvider";

export default function Survey() {
  const { surveys } = UserStateContext();
  // console.log(surveys);
  const onDeleteClick = () => {
    console.log("onDelete Click");
  };
  return (
    <PageComponent
      title="Survey"
      buttons={
        <TButton color="green" to="/survey/create">
          <PlusCircleIcon className=" h-6 w-6 mr-2" />
          Create New
        </TButton>
      }
    >
      <div className=" grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {surveys.map((survey) => (
          <SurveyListItem
            survey={survey}
            key={survey.id}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    </PageComponent>
  );
}
