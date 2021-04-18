import api from "../../services/api";

export const repoGetAllApresentations = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get("cardsstudy/v1/presentations")
      .then(async (res) => {
        resolve(res.data);
        return res.data;
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const repoCreateApresentation = (apresentationInfos) => {
  return new Promise(async (resolve, reject) => {
    let response = null;
    await api
      .post("cardsstudy/v1/presentations", apresentationInfos)
      .then(async (res) => {
        resolve(res);
        return res;
      })
      .catch((error) => {
        response = error.response.data;
      })
      .finally(() => {
        resolve(response);
        return response;
      });
  });
};

export const repoUpdateApresentation = (apresensationId, dataApresentation) => {
  return new Promise((resolve) => {
    let response = null;
    api.put(`/cardsstudy/v1/presentations/${apresensationId}`, dataApresentation)
    .then(async res => {
      resolve(res.data)    
      return res.data;
    }).catch((error) => {
      response = error;
    }).finally (() => {
      resolve(response);
      return response;
    });
  });
};