"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "locked";
  lastLogin: string;
}

interface Role {
  name: string;
  level: number;
  users: number;
  permissions: string[];
}

const USERS: User[] = [
  { id: "USR-001", name: "Kim Jung-Ho", role: "Admin", department: "IT", status: "active", lastLogin: "2026-04-15 10:02" },
  { id: "USR-002", name: "Park Soo-Yeon", role: "Supervisor", department: "Production", status: "active", lastLogin: "2026-04-15 09:58" },
  { id: "USR-003", name: "Lee Min-Ji", role: "Operator", department: "Production", status: "active", lastLogin: "2026-04-15 09:45" },
  { id: "USR-004", name: "Choi Won-Suk", role: "Manager", department: "QC", status: "active", lastLogin: "2026-04-15 09:30" },
  { id: "USR-005", name: "Han Yu-Ri", role: "Operator", department: "Warehouse", status: "active", lastLogin: "2026-04-15 08:55" },
  { id: "USR-006", name: "Yoon Tae-Ho", role: "Operator", department: "Production", status: "inactive", lastLogin: "2026-04-12 17:00" },
  { id: "USR-007", name: "Jang Mi-Na", role: "Viewer", department: "Management", status: "active", lastLogin: "2026-04-15 08:10" },
  { id: "USR-008", name: "Seo Dong-Hyun", role: "Operator", department: "Maintenance", status: "locked", lastLogin: "2026-04-14 14:22" },
];

const ROLES: Role[] = [
  { name: "Admin", level: 1, users: 1, permissions: ["전체 시스템 접근", "사용자 관리", "시스템 설정", "전체 운영"] },
  { name: "Manager", level: 2, users: 1, permissions: ["생산 관리", "리포트", "승인", "감사 조회"] },
  { name: "Supervisor", level: 3, users: 1, permissions: ["생산 제어", "지시 관리", "알람 대응", "데이터 정정"] },
  { name: "Operator", level: 4, users: 4, permissions: ["생산 입력", "스캔", "알람 조회", "기본 리포트"] },
  { name: "Viewer", level: 5, users: 1, permissions: ["대시보드 조회", "리포트 조회"] },
];

const PERMISSION_MODULES = ["대시보드", "생산", "품질", "알람", "리포트", "사용자", "시스템", "감사"];

const ROLE_PERMISSIONS: Record<string, Record<string, string>> = {
  Admin:      { "대시보드": "RW", "생산": "RW", "품질": "RW", "알람": "RW", "리포트": "RW", "사용자": "RW", "시스템": "RW", "감사": "RW" },
  Manager:    { "대시보드": "RW", "생산": "RW", "품질": "RW", "알람": "RW", "리포트": "RW", "사용자": "R",  "시스템": "R",  "감사": "R" },
  Supervisor: { "대시보드": "R",  "생산": "RW", "품질": "RW", "알람": "RW", "리포트": "R",  "사용자": "-",  "시스템": "-",  "감사": "-" },
  Operator:   { "대시보드": "R",  "생산": "W",  "품질": "R",  "알람": "R",  "리포트": "R",  "사용자": "-",  "시스템": "-",  "감사": "-" },
  Viewer:     { "대시보드": "R",  "생산": "-",  "품질": "-",  "알람": "-",  "리포트": "R",  "사용자": "-",  "시스템": "-",  "감사": "-" },
};

const USER_COLUMNS = [
  { key: "id", label: "사용자 ID" },
  { key: "name", label: "이름" },
  { key: "role", label: "역할" },
  { key: "department", label: "부서" },
  { key: "status", label: "상태" },
  { key: "lastLogin", label: "최종 로그인" },
];

export default function UserManagementPage() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("Operator");
  const [newDept, setNewDept] = useState("");

  const handleOpenAdd = () => {
    setEditUser(null);
    setNewName("");
    setNewRole("Operator");
    setNewDept("");
    setShowAddUser(true);
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
    setNewName(user.name);
    setNewRole(user.role);
    setNewDept(user.department);
    setShowAddUser(true);
  };

  return (
    <div>
      <PageHeader
        title="사용자/권한"
        accent="관리"
        nodeRef="SCR-COM-005"
        status="ADMIN"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User List */}
        <div className="lg:col-span-2">
          <div className="bg-surface-container-lowest">
            <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
              <h3 className="font-headline font-black text-xs uppercase tracking-widest">
                사용자 목록
                <span className="opacity-30 font-light ml-2">| {USERS.length} 명</span>
              </h3>
              <button
                onClick={handleOpenAdd}
                className="bg-primary-accent text-on-primary px-4 py-2 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-container transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">person_add</span>
                사용자 추가
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant/10">
                    {USER_COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        className="p-4 font-label uppercase tracking-widest text-xs opacity-60"
                      >
                        {col.label}
                      </th>
                    ))}
                    <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody className="font-headline text-sm">
                  {USERS.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors"
                    >
                      <td className="px-4 py-2 tabular-nums">{user.id}</td>
                      <td className="px-4 py-2 font-bold">{user.name}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 text-xs font-label uppercase tracking-widest font-bold ${
                          user.role === "Admin"
                            ? "bg-primary-accent/20 text-primary-accent"
                            : user.role === "Manager"
                            ? "bg-[#f59e0b]/20 text-[#f59e0b]"
                            : user.role === "Supervisor"
                            ? "bg-tertiary/20 text-tertiary"
                            : "bg-surface-container-highest text-on-surface-variant"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-2">{user.department}</td>
                      <td className="px-4 py-2">
                        <StatusBadge
                          type={user.status === "active" ? "running" : user.status === "locked" ? "error" : "idle"}
                          label={user.status.toUpperCase()}
                        />
                      </td>
                      <td className="px-4 py-2 tabular-nums">{user.lastLogin}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-primary-accent hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: Roles + Add/Edit Form */}
        <div className="space-y-6">
          {/* Add/Edit User Form */}
          {showAddUser && (
            <div className="bg-surface-container-lowest p-6 border-l-4 border-primary-accent">
              <FieldHeader
                title={editUser ? "사용자 수정" : "신규 사용자 추가"}
                moduleRef="MOD-USR-FORM"
              />
              <div className="space-y-4">
                <div>
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="이름 입력"
                    className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                    역할
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
                  >
                    {ROLES.map((r) => (
                      <option key={r.name} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
                    부서
                  </label>
                  <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    placeholder="부서 입력"
                    className="w-full bg-surface-container p-3 text-on-surface font-headline text-sm border border-outline-variant/20 focus:border-primary-accent focus:outline-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-primary-accent text-on-primary py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-container transition-colors">
                    {editUser ? "수정" : "생성"}
                  </button>
                  <button
                    onClick={() => setShowAddUser(false)}
                    className="flex-1 bg-surface-container text-on-surface-variant py-3 font-label text-xs uppercase tracking-widest font-bold border border-outline-variant/20 hover:border-outline-variant/40 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Role Management */}
          <div className="bg-surface-container-lowest p-6">
            <FieldHeader title="역할 관리" moduleRef="MOD-USR-ROLE" />
            <div className="space-y-3">
              {ROLES.map((role) => (
                <div
                  key={role.name}
                  className="bg-surface-container p-4 border-l-2 border-outline-variant/20 hover:border-primary-accent transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-headline text-sm font-bold">{role.name}</span>
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                      Lv.{role.level} | {role.users} 명
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((p) => (
                      <span
                        key={p}
                        className="px-2 py-0.5 text-[11px] font-label uppercase tracking-wider bg-surface-container-lowest text-on-surface-variant"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Permission Matrix */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest">
          <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-tertiary">
            <h3 className="font-headline font-black text-xs uppercase tracking-widest">
              권한 매트릭스
            </h3>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
              R = 읽기 | W = 쓰기 | RW = 전체접근
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/10">
                  <th className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-60">
                    역할
                  </th>
                  {PERMISSION_MODULES.map((mod) => (
                    <th
                      key={mod}
                      className="p-4 font-label uppercase tracking-widest text-xs opacity-60 text-center"
                    >
                      {mod}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-headline text-sm">
                {ROLES.map((role) => (
                  <tr
                    key={role.name}
                    className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors"
                  >
                    <td className="px-4 py-2 font-bold">{role.name}</td>
                    {PERMISSION_MODULES.map((mod) => {
                      const perm = ROLE_PERMISSIONS[role.name]?.[mod] || "-";
                      return (
                        <td key={mod} className="px-4 py-2 text-center">
                          <span
                            className={`px-2 py-1 text-xs font-label uppercase tracking-widest font-bold ${
                              perm === "RW"
                                ? "bg-tertiary/20 text-tertiary"
                                : perm === "R"
                                ? "bg-[#f59e0b]/20 text-[#f59e0b]"
                                : perm === "W"
                                ? "bg-primary-accent/20 text-primary-accent"
                                : "bg-surface-container text-on-surface-variant opacity-30"
                            }`}
                          >
                            {perm}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
