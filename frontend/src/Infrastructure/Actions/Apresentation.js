import { getAllApresentations, createApresentation, updateApresentation } from '../Services/Apresensation';



export const doGetAllApresentations = async (dispatch) => {
  await getAllApresentations().then(apresentations => {
    return dispatch({
      type: 'ALL_APRESENSATIONS',
      payload: apresentations
    });

  }).catch((error) => {
    return dispatch({
      type: 'REQUEST_ERROR',
      payload: error

    });

  });
}
export const doCreateApresentation = async (dispatch, apresentationInfos) => {
  try{
    return createApresentation(apresentationInfos)
  }catch(error){
    return dispatch({
      type: 'REQUEST_ERROR',
      payload: error
    });
  }
}

export const doUpdateApresensation = async (dispatch, apresentationId, dataApresentation) => {
  try{
   return updateApresentation(apresentationId, dataApresentation);
  }catch(error){
   return dispatch({
     type: 'REQUEST_ERROR',
     payload: error
   });
 }
 }

