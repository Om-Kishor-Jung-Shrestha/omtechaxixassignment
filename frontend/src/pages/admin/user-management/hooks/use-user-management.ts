
import {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from "@/features/users/api/users.api";

import type {
  UserManagementResponseDto,
} from "@/features/users/types/user.types";

import type {
  UserQueryDto,
} from "@/features/users/types/user-query.types";

import type {
  UserRole,
  UserStatus,
  AuthProvider,
} from "@/types/user.types";

type UserSortField =
  | "firstName"
  | "lastName"
  | "email"
  | "role"
  | "status"
  | "lastLogin"
  | "createdAt"
  | "updatedAt";

type UserSortOrder = "asc" | "desc";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const DEFAULT_SORT_BY: UserSortField = "createdAt";
const DEFAULT_SORT_ORDER: UserSortOrder = "desc";

export function useUserManagement() {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState<UserRole | undefined>(
    undefined
  );

  const [status, setStatus] = useState<
    UserStatus | undefined
  >(undefined);

  const [authProvider, setAuthProvider] = useState<
    AuthProvider | undefined
  >(undefined);

  const [isVerified, setIsVerified] = useState<
    boolean | undefined
  >(undefined);

  const [sortBy, setSortBy] =
    useState<UserSortField>(DEFAULT_SORT_BY);

  const [sortOrder, setSortOrder] =
    useState<UserSortOrder>(DEFAULT_SORT_ORDER);

  const [selectedUser, setSelectedUser] =
    useState<UserManagementResponseDto | null>(null);

  const [isDetailsOpen, setIsDetailsOpen] =
    useState(false);

  const query = useMemo<UserQueryDto>(() => {
    const params: UserQueryDto = {
      page,
      limit,
      sortBy,
      sortOrder,
    };

    if (search.trim()) {
      params.search = search.trim();
    }

    if (role !== undefined) {
      params.role = role;
    }

    if (status !== undefined) {
      params.status = status;
    }

    if (authProvider !== undefined) {
      params.authProvider = authProvider;
    }

    if (isVerified !== undefined) {
      params.isVerified = isVerified;
    }

    return params;
  }, [
    page,
    limit,
    search,
    role,
    status,
    authProvider,
    isVerified,
    sortBy,
    sortOrder,
  ]);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetUsersQuery(query);

  const [
    updateUserStatus,
    {
      isLoading: isUpdatingStatus,
      error: updateStatusError,
    },
  ] = useUpdateUserStatusMutation();

  const users = data?.items ?? [];

  const pagination = data?.pagination ?? {
    page,
    limit,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  const updatingUserId =
    isUpdatingStatus && selectedUser
      ? selectedUser.id
      : undefined;

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      setPage(DEFAULT_PAGE);
    },
    []
  );

  const handleRoleChange = useCallback(
    (value?: UserRole) => {
      setRole(value);
      setPage(DEFAULT_PAGE);
    },
    []
  );

  const handleStatusChange = useCallback(
    (value?: UserStatus) => {
      setStatus(value);
      setPage(DEFAULT_PAGE);
    },
    []
  );

  const handleAuthProviderChange = useCallback(
    (value?: AuthProvider) => {
      setAuthProvider(value);
      setPage(DEFAULT_PAGE);
    },
    []
  );

  const handleVerificationChange = useCallback(
    (value?: boolean) => {
      setIsVerified(value);
      setPage(DEFAULT_PAGE);
    },
    []
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (nextPage < 1) {
        return;
      }

      if (
        pagination.totalPages > 0 &&
        nextPage > pagination.totalPages
      ) {
        return;
      }

      setPage(nextPage);
    },
    [pagination.totalPages]
  );

  const handleLimitChange = useCallback(
    (nextLimit: number) => {
      setLimit(nextLimit);
      setPage(DEFAULT_PAGE);
    },
    []
  );

  const handleSortChange = useCallback(
    (
      nextSortBy: UserSortField,
      nextSortOrder: UserSortOrder
    ) => {
      setSortBy(nextSortBy);
      setSortOrder(nextSortOrder);
      setPage(DEFAULT_PAGE);
    },
    []
  );

  const handleViewUser = useCallback(
    (user: UserManagementResponseDto) => {
      setSelectedUser(user);
      setIsDetailsOpen(true);
    },
    []
  );

  const handleCloseDetails = useCallback(() => {
    setIsDetailsOpen(false);
    setSelectedUser(null);
  }, []);

const handleUserStatusChange = useCallback(
  async (
    user: UserManagementResponseDto,
    nextStatus: UserStatus
  ) => {
    if (user.role === "superadmin") {
      return;
    }

    try {
      const updatedUser = await updateUserStatus({
        id: user.id,
        status: nextStatus,
      }).unwrap();

      if (selectedUser?.id === updatedUser.id) {
        setSelectedUser(updatedUser);
      }
    } catch {
      // RTK Query exposes the mutation error through
      // updateStatusError. The page remains stable and
      // the table data is not manually mutated.
    }
  },
  [selectedUser, updateUserStatus]
);


  const resetFilters = useCallback(() => {
    setSearch("");
    setRole(undefined);
    setStatus(undefined);
    setAuthProvider(undefined);
    setIsVerified(undefined);

    setSortBy(DEFAULT_SORT_BY);
    setSortOrder(DEFAULT_SORT_ORDER);

    setPage(DEFAULT_PAGE);
    setLimit(DEFAULT_LIMIT);
  }, []);

  return {
    users,

    page: pagination.page,
    limit: pagination.limit,

    totalItems: pagination.totalItems,
    totalPages: pagination.totalPages,
    hasNextPage: pagination.hasNextPage,
    hasPreviousPage: pagination.hasPreviousPage,

    search,
    role,
    status,
    authProvider,
    isVerified,

    sortBy,
    sortOrder,

    isLoading,
    isFetching,
    isError,
    error,

    selectedUser,
    isDetailsOpen,

    updatingUserId,
    isUpdatingStatus,
    updateStatusError,

    refetch,

    handleSearchChange,
    handleRoleChange,
    handleStatusChange,
    handleAuthProviderChange,
    handleVerificationChange,

    handlePageChange,
    handleLimitChange,
    handleSortChange,

    handleUserStatusChange,

    handleViewUser,
    handleCloseDetails,

    resetFilters,
  };
}
