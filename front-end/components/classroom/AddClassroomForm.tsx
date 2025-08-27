import classNames from "classnames"
import { useState } from "react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import ClassroomService from "@services/ClassroomService"

const AddClassroomForm: React.FC = () => {
    const [name, setName] = useState("")
    const [statusNotif, setStatusNotif] = useState<{ message: string; type: "error" | "success" }[]>([])
    const [emptyName, setEmptyName] = useState<string | null>(null)

    const { t } = useTranslation()
    

    const clearErrors = () => {
        setStatusNotif([])
        setEmptyName(null)
    }

    const validate = (): boolean => {
        let result = true
        if (!name.trim()) {
        setEmptyName(t("classroom.form.errorEmpty"))
        result = false
        }
        return result
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        clearErrors()

        if (!validate()) return

        try {
            const response = await ClassroomService.createClassroom(name)
            
            if (response.status === 201) {
                const created = await response.json()
                setStatusNotif([{ message: t("classroom.form.success", { name: created.name, id: created.id }), type: "success" }])
                setName("")
            } else {
                setStatusNotif([{ message: t("classroom.form.errorGeneric"), type: "error" }])
            }   
        } catch {
            setStatusNotif([{ message: t("classroom.form.errorGeneric"), type: "error" }])
        }
    }

    return (
        <div className="max-w-sm m-auto">
        <h3 className="px-0 mb-3">{t("classroom.title")}</h3>

        {statusNotif.length > 0 && (
            <ul className="list-none mb-3">
            {statusNotif.map((nt, idx) => (
                <li
                key={idx}
                className={classNames({
                    "text-red-800": nt.type === "error",
                    "text-green-800": nt.type === "success",
                })}
                >
                {nt.message}
                </li>
            ))}
            </ul>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                {t("classroom.form.label")}
            </label>
            <input
                id="nameInput"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {emptyName && <div className="text-red-800 ">{emptyName}</div>}

            <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-max"
            >
            {t("classroom.form.submit")}
            </button>
        </form>
        </div>
    )
}

export default AddClassroomForm
