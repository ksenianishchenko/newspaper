import relationshipTypes from './relationship-types'

export const createNewRelationship = (relationship) => ({
  type: relationshipTypes.CREATE_NEW_RELATIONSHIP,
  payload: relationship
});

export const deleteRelationship = (relationship) => ({
  type: relationshipTypes.DELETE_RELATIONSHIP,
  payload: relationship
});
