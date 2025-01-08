import {getRole} from "./AuthUtils";

export function isAdmin() {
    return getRole() === 'ADMIN';
}

export function isAtLeastModerator() {
    const role = getRole();
    return role === 'ADMIN' || role === 'MODERATOR';
}

export function isUser() {
    return getRole() === 'USER';
}

/**
 * This function returns boolean that decides if resource (e.g. exercise) can be accessible by
 * logged user.
 *
 * @param entityPrivate boolean value from entity read model that defines if logged user
 * is and owner of this resource or not.
 *
 * @returns {boolean|*} If true then user can access or if moderator/admin. Else false
 */
export function moderationRoleOrOwner(entityPrivate) {
    return (entityPrivate && isUser()) || isAtLeastModerator();
}