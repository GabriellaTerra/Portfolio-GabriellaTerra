import {
  Project as ProjectWrapper,
  ProjectTitle,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";
import { deployInfo } from "@/utils/deployInfo";

interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
}

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos?sort=created&direction=desc`
      );

      const json = await data.json();
      const filtered = json.filter(
        (repo: ReposType) =>
          repo.name !== "GabriellaTerra"  )

      setRepositories(filtered)

      return filtered
    }

    
    

    fetchData();
  }, []);

  return (
    <>
      {repositories &&
        repositories?.map?.((repo) => (
          <ProjectWrapper key={repo.id}>
            <ProjectTitle
              as="h2"
              type="heading3"
              css={{ marginBottom: "$3" }}
              color="grey4"
            >
              {repo.name}
            </ProjectTitle>

            <ProjectStack>
              <Text type="body2" color="grey2">
                Primary Language:
              </Text>
              {repo.language ? (
                <ProjectStackTech>
                  <Text color="brand2" type="body2">
                    {repo.language}
                  </Text>
                </ProjectStackTech>
              ) : (
                <ProjectStackTech>
                  <Text color="grey2" type="body2">
                    Primary language not identified
                  </Text>
                </ProjectStackTech>
              )}
            </ProjectStack>

            <Text type="body1" color="grey2">
              {repo.description?.substring(0, 129)}
            </Text>
            <ProjectLinks>
              <ProjectLink target="_blank" href={repo.html_url}>
                <FaGithub /> Github Code
              </ProjectLink>
              {repo.homepage && (
                <ProjectLink
                  target="_blank"
                  href={repo.homepage}
                >
                  <FaShare /> See demo
                </ProjectLink>
              )}
              {deployInfo.map((project) => {
                return (
                  project.name === repo.name && (
                    <ProjectLink target="_blank" href={project.deploy}>
                      <FaShare /> Deploy Link
                    </ProjectLink>
                  )
                );
              })}
            </ProjectLinks>
          </ProjectWrapper>
        ))}
    </>
  );
};
