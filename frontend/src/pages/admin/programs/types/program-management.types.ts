import type { Dispatch, SetStateAction } from "react";
import type {
  CreateProgramDto,
  ProgramResponseDto,
} from "@/features/programs/types/program.types";

export interface ProgramsHeaderProps {
  totalPrograms: number;
  onAddProgram: () => void;
  onAddCourse: () => void;
}

export interface ProgramsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export interface ProgramsTableProps {
  programs: ProgramResponseDto[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isDeleting: boolean;
  hasSearch: boolean;
  onView: (program: ProgramResponseDto) => void;
  onEdit: (program: ProgramResponseDto) => void;
  onDelete: (program: ProgramResponseDto) => void;
  onAddProgram: () => void;
}

export interface ProgramsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

// export interface ProgramFormModalProps {
//   open: boolean;
//   editingProgram: ProgramResponseDto | null;
//   form: CreateProgramDto;
//   isSaving: boolean;
//   onChange: Dispatch<SetStateAction<CreateProgramDto>>;
//   onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
//   onClose: () => void;
// }
export interface ProgramFormModalProps {
  open: boolean;
  editingProgram: ProgramResponseDto | null;
  form: CreateProgramDto;
  isSaving: boolean;
  onChange: Dispatch<
    SetStateAction<CreateProgramDto>
  >;
  onSubmit: (
    event: SubmitEvent,
  ) => void;
  onClose: () => void;
}
export interface ProgramViewModalProps {
  program: ProgramResponseDto | null;
  onClose: () => void;
}