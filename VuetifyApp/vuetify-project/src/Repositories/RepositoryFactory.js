import KadasterRepository from "./kadasterRepository";

const repositories = {
    kadaster: KadasterRepository,
};

export const RepositoryFactory = {
    get: name => repositories[name]
};