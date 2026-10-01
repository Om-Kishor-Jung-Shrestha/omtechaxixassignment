// import { useState } from "react";

// import {
//   useCreateProgramMutation,
//   useDeleteProgramMutation,
//   useGetProgramsQuery,
//   useUpdateProgramMutation,
// } from "@/features/programs/api/program.api";

// import type {
//   CreateProgramDto,
//   ProgramResponseDto,
// } from "@/features/programs/types/program.types";

// import { ProgramsHeader } from "./components/ProgramsHeader";
// import { ProgramsSearch } from "./components/ProgramsSearch";
// import { ProgramsTable } from "./components/ProgramsTable";
// import { ProgramsPagination } from "./components/ProgramsPagination";
// import { ProgramFormModal } from "./components/ProgramFormModal";
// import { ProgramViewModal } from "./components/ProgramViewModal";

// const PAGE_SIZE = 10;

// const initialForm: CreateProgramDto = {
//   mnemonic: "",
//   name: "",
// };

// export function ProgramsManagementPage() {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [isFormOpen, setIsFormOpen] = useState(false);

//   const [editingProgram, setEditingProgram] =
//     useState<ProgramResponseDto | null>(null);

//   const [viewingProgram, setViewingProgram] =
//     useState<ProgramResponseDto | null>(null);

//   const [form, setForm] =
//     useState<CreateProgramDto>(initialForm);

//   const {
//     data,
//     isLoading,
//     isFetching,
//     isError,
//   } = useGetProgramsQuery({
//     page: currentPage,
//     limit: PAGE_SIZE,
//     ...(search.trim()
//       ? { mnemonic: search.trim() }
//       : {}),
//   });

//   const [createProgram, { isLoading: isCreating }] =
//     useCreateProgramMutation();

//   const [updateProgram, { isLoading: isUpdating }] =
//     useUpdateProgramMutation();

//   const [deleteProgram, { isLoading: isDeleting }] =
//     useDeleteProgramMutation();

//   const programs = data?.data ?? [];
//   const pagination = data?.pagination;

//   const totalPrograms = pagination?.total ?? 0;
//   const totalPages = pagination?.totalPages ?? 1;

//   function handleSearchChange(value: string) {
//     setSearch(value);
//     setCurrentPage(1);
//   }

//   function handleAddProgram() {
//     setEditingProgram(null);
//     setForm(initialForm);
//     setIsFormOpen(true);
//   }

//   function handleEditProgram(
//     program: ProgramResponseDto
//   ) {
//     setEditingProgram(program);

//     setForm({
//       mnemonic: program.mnemonic,
//       name: program.name,
//     });

//     setIsFormOpen(true);
//   }

//   function handleCloseForm() {
//     setIsFormOpen(false);
//     setEditingProgram(null);
//     setForm(initialForm);
//   }

//   function handleViewProgram(
//     program: ProgramResponseDto
//   ) {
//     setViewingProgram(program);
//   }

//   async function handleDeleteProgram(
//     program: ProgramResponseDto
//   ) {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${program.name}"?`
//     );

//     if (!confirmed) return;

//     try {
//       await deleteProgram({
//         id: program.id,
//       }).unwrap();

//       if (
//         programs.length === 1 &&
//         currentPage > 1
//       ) {
//         setCurrentPage((page) => page - 1);
//       }
//     } catch {
//       window.alert(
//         "Unable to delete the program."
//       );
//     }
//   }

//   async function handleSubmit(
//     event: React.FormEvent<HTMLFormElement>
//   ) {
//     event.preventDefault();

//     const payload: CreateProgramDto = {
//       mnemonic: form.mnemonic.trim(),
//       name: form.name.trim(),
//     };

//     if (!payload.mnemonic || !payload.name) {
//       return;
//     }

//     try {
//       if (editingProgram) {
//         await updateProgram({
//           id: editingProgram.id,
//           ...payload,
//         }).unwrap();
//       } else {
//         await createProgram(payload).unwrap();
//         setCurrentPage(1);
//       }

//       handleCloseForm();
//     } catch {
//       // handled by mutation state
//     }
//   }

//   return (
//     <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
//       <div className="mx-auto w-full max-w-[1600px] space-y-6">

//         <ProgramsHeader
//           totalPrograms={totalPrograms}
//           onAddProgram={handleAddProgram}
//         />

//         <ProgramsSearch
//           value={search}
//           onChange={handleSearchChange}
//         />

//         <ProgramsTable
//           programs={programs}
//           isLoading={isLoading}
//           isFetching={isFetching}
//           isError={isError}
//           isDeleting={isDeleting}
//           onView={handleViewProgram}
//           onEdit={handleEditProgram}
//           onDelete={handleDeleteProgram}
//           onAddProgram={handleAddProgram}
//           hasSearch={Boolean(search.trim())}
//         />

//         {!isLoading &&
//           !isError &&
//           programs.length > 0 && (
//             <ProgramsPagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               totalItems={totalPrograms}
//               pageSize={PAGE_SIZE}
//               onPageChange={setCurrentPage}
//             />
//           )}

//         <ProgramFormModal
//           open={isFormOpen}
//           editingProgram={editingProgram}
//           form={form}
//           isSaving={isCreating || isUpdating}
//           onChange={setForm}
//           onSubmit={handleSubmit}
//           onClose={handleCloseForm}
//         />

//         <ProgramViewModal
//           program={viewingProgram}
//           onClose={() => setViewingProgram(null)}
//         />
//       </div>
//     </div>
//   );
// }
import { useState } from "react";

import {
  useCreateProgramMutation,
  useDeleteProgramMutation,
  useGetProgramsQuery,
  useUpdateProgramMutation,
} from "@/features/programs/api/program.api";

import type {
  CreateProgramDto,
  ProgramResponseDto,
} from "@/features/programs/types/program.types";

import { ProgramsHeader } from "./components/ProgramsHeader";
import { ProgramsSearch } from "./components/ProgramsSearch";
import { ProgramsTable } from "./components/ProgramsTable";
import { ProgramsPagination } from "./components/ProgramsPagination";
import { ProgramFormModal } from "./components/ProgramFormModal";
import { ProgramViewModal } from "./components/ProgramViewModal";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const initialForm: CreateProgramDto = {
  mnemonic: "",
  name: "",
};



export function ProgramsManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();

  const [editingProgram, setEditingProgram] =
    useState<ProgramResponseDto | null>(null);

  const [viewingProgram, setViewingProgram] =
    useState<ProgramResponseDto | null>(null);

  const [form, setForm] =
    useState<CreateProgramDto>(initialForm);

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetProgramsQuery({
    page: currentPage,
    limit: PAGE_SIZE,
    ...(search.trim()
      ? { mnemonic: search.trim() }
      : {}),
  });

  const [createProgram, { isLoading: isCreating }] =
    useCreateProgramMutation();

  const [updateProgram, { isLoading: isUpdating }] =
    useUpdateProgramMutation();

  const [deleteProgram, { isLoading: isDeleting }] =
    useDeleteProgramMutation();

  // const programs = data?.data ?? [];
  // const pagination = data?.pagination;

  // const totalPrograms = pagination?.total ?? 0;
  // const totalPages = pagination?.totalPages ?? 1;
  const programs = data?.items ?? [];
  const pagination = data?.pagination;

  const totalPrograms = pagination?.totalItems ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleAddProgram() {
    setEditingProgram(null);
    setForm(initialForm);
    setIsFormOpen(true);
  }

  function handleEditProgram(program: ProgramResponseDto) {
    setEditingProgram(program);

    setForm({
      mnemonic: program.mnemonic,
      name: program.name,
    });

    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingProgram(null);
    setForm(initialForm);
  }

  function handleViewProgram(program: ProgramResponseDto) {
    setViewingProgram(program);
  }

  async function handleDeleteProgram(
    program: ProgramResponseDto,
  ) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${program.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProgram({
        id: program.id,
      }).unwrap();

      if (
        programs.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage((page) => page - 1);
      }
    } catch {
      window.alert(
        "Unable to delete the program.",
      );
    }
  }

  // async function handleSubmit(event: SubmitEvent) {
  //   event.preventDefault();

  //   const payload: CreateProgramDto = {
  //     mnemonic: form.mnemonic.trim(),
  //     name: form.name.trim(),
  //   };

  //   if (!payload.mnemonic || !payload.name) {
  //     return;
  //   }

  //   try {
  //     if (editingProgram) {
  //       await updateProgram({
  //         id: editingProgram.id,
  //         ...payload,
  //       }).unwrap();
  //     } else {
  //       await createProgram(payload).unwrap();
  //       setCurrentPage(1);
  //     }

  //     handleCloseForm();
  //   } catch {
  //     // handled by mutation state
  //   }
  // }

  const handleSubmit: NonNullable<
  React.ComponentProps<"form">["onSubmit"]
> = async (event) => {
  event.preventDefault();

  const payload: CreateProgramDto = {
    mnemonic: form.mnemonic.trim(),
    name: form.name.trim(),
  };

  if (!payload.mnemonic || !payload.name) {
    return;
  }

  try {
    if (editingProgram) {
      await updateProgram({
        id: editingProgram.id,
        ...payload,
      }).unwrap();
    } else {
      await createProgram(payload).unwrap();
      setCurrentPage(1);
    }

    handleCloseForm();
  } catch {
    // handled by mutation state
  }
};

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto w-full max-w-[1600px] space-y-6">
        <ProgramsHeader
          totalPrograms={totalPrograms}
          onAddProgram={handleAddProgram}
          onAddCourse={() =>
            navigate("/admin/courses/new")
          }
        />

        <ProgramsSearch
          value={search}
          onChange={handleSearchChange}
        />

        <ProgramsTable
          programs={programs}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isDeleting={isDeleting}
          onView={handleViewProgram}
          onEdit={handleEditProgram}
          onDelete={handleDeleteProgram}
          onAddProgram={handleAddProgram}
          hasSearch={Boolean(search.trim())}
        />

        {!isLoading &&
          !isError &&
          programs.length > 0 && (
            <ProgramsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalPrograms}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          )}

        <ProgramFormModal
          open={isFormOpen}
          editingProgram={editingProgram}
          form={form}
          isSaving={isCreating || isUpdating}
          onChange={setForm}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
        />

        <ProgramViewModal
          program={viewingProgram}
          onClose={() => setViewingProgram(null)}
        />
      </div>
    </div>
  );
}