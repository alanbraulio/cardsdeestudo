import {
  repoGetAllApresentations,
  repoCreateApresentation,
  repoUpdateApresentation
} from "../Repositories/Apresensation";

export const getAllApresentations = async () => {
  try {
    const response = await repoGetAllApresentations();
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const createApresentation = async (apresentationInfos) => {
  try {
    const response = await repoCreateApresentation(apresentationInfos);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const updateApresentation = async (apresentationId, dataApresentation) => {
    try{
        const response = await repoUpdateApresentation(apresentationId, dataApresentation);
        return response;
    }catch (error) {
        throw error.response;
    }
};
