import { Robot, RobotType } from "./queries";

export const medicalExecutionQuery = (langID: "it" | "en") => ({
  queryKey: ["medicalExecution", langID],
  queryFn: async () => {
    const data = await fetch(
      import.meta.env.VITE_ROBOT_TYPE_ENDPOINT +
        "?per_page=100" +
        "&lang=" +
        langID,
    );
    const json = await data.json();

    const robotList = await fetch(
      import.meta.env.VITE_ROBOT_LIST_ENDPOINT + "?per_page=100&lang=" + langID,
    );
    const robotListJson: Robot[] = await robotList.json();

    const parsedRobots = robotListJson.map((robot) => {
      const parentFamilies: RobotType[] = json.filter((families: RobotType) =>
        robot["tipo-robot"].includes(families.id),
      );

      const allegatiFam = parentFamilies.map((fam) => {
        return fam.acf?.allegato;
      });

      const mergedAllegati = [
        ...(robot.acf.allegato || []),
        ...allegatiFam.flat(),
      ];

      return {
        id: robot.id,
        acf: robot.acf,
        featured_media: robot.featured_media,
        tipo_robot: robot["tipo-robot"],
        slug: robot.slug,
        title: robot.title,
      };
    });

    const parsedJson = json.map((elem: RobotType) => {
      return {
        id: elem.id,
        acf: elem.acf,
        name: elem.name,
        description: elem.description,
        slug: elem.slug,
        count: elem.count,
        children_robots: parsedRobots.filter((rob) =>
          rob.tipo_robot.includes(elem.id),
        ),
      };
    });
    return parsedJson;
  },

  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});
