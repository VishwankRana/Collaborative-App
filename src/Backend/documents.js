export function getUserRole(document, userId) {
  const normalizedUserId = String(userId);
  const ownerId = String(document.owner?._id || document.owner);

  if (ownerId === normalizedUserId) {
    return "owner";
  }

  const collaborator = document.collaborators.find(({ user }) => {
    return String(user) === normalizedUserId || String(user?._id) === normalizedUserId;
  });

  return collaborator?.role ?? null;
}

export function canEditDocument(role) {
  return role === "owner" || role === "editor";
}

export function serializeCollaborator(collaborator) {
  return {
    id: String(collaborator.user._id || collaborator.user),
    name: collaborator.user.name,
    email: collaborator.user.email,
    role: collaborator.role,
  };
}
