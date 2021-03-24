const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  repository_object = repositories.find(
    repository => repository.id === id
  );

  if (!repository_object)
    return response.status(404).json({ error: "Repository not found" });

  if(title)
    repository_object.title = title;
  
  if(url)
    repository_object.url = url;

  if(techs)
    repository_object.techs = techs;

  return response.json(repository_object);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex == -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repository_object = repositories.find(
    repository => repository.id === id
  );

  if (!repository_object)
    return response.status(404).json({ error: "Repository not found" });

  repository_object.likes += 1;

  return response.json({likes: repository_object.likes});
});

module.exports = app;
