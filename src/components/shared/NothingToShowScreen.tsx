interface NothingToShowScreenProps {
  text: string;
}

function NothingToShowScreen({ text }: NothingToShowScreenProps) {
  return (
    <div className="h-full w-full flex justify-center items-center text-center text-red-500 font-light text-8xl ">
      {text}
    </div>
  );
}

export default NothingToShowScreen;
