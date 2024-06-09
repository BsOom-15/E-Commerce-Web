import { useState } from "react"
import 
{ 
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useRemoveCategoryMutation,
    useFetchCategoriesQuery

} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenue from "./AdminMenue";


const CategoryList = () => {
    const {data: categories} = useFetchCategoriesQuery();
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatingName, setUpditingName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [removeCategory] = useRemoveCategoryMutation();


    const handeleCreateCategory = async (e) => {
        e.preventDefault()
        if (!name) {
            toast.error('Category name is require')
            return
        }

        try {
            const result = await createCategory({name}).unwrap()

            if (result.error) {
                toast.error(result.error)
            } else {
                setName("")
                toast.success(`${result.name} is created`)
            } 
        } catch (error) {
            console.error(error);
            toast.error('Creating category failed, try again')
        }
    }


    const handeleUpdateCategory = async (e) => {
        e.preventDefault();

        if (!updatingName) {
            toast.error('Category name is required');
            return;
        }


        try {
            const result = await updateCategory({categoryId: selectedCategory._id, updatedCategory: {
                name: updatingName
            }}).unwrap()

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(`${result.name} is updated`)
                setSelectedCategory(null);
                setUpditingName("");
                setModalVisible(false);

            }
        } catch (error) {
            console.error(error);
        }
    };


    const handeleRemoveCategory = async () => {
        try {
            const result = await removeCategory(selectedCategory._id).unwrap()

            if (result.error) {
                toast.error(result.error)
            }else {
                toast.success(`${result.name} is deleted.`);
                setSelectedCategory(null);
                setModalVisible(false);
            }
        } catch (error) {
            console.error(error);
            toast.error('Category delection faild. try again.')
        }
    }


    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
        <AdminMenue/>
        <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
            <CategoryForm 
            value={name} 
            setValue={setName} 
            handeleSubmit={handeleCreateCategory}/>

            <br />
            <hr />

            <div className="flex flex-wrap">
                {categories?.map((category) => (
                    <div key={category._id}>
                        <button className="border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                        onClick={()=>{{
                            setModalVisible(true)
                            setSelectedCategory(category)
                            setUpditingName(category.name)
                        }}}
                        >
                        {category.name}
                        </button>
                    </div>
                ))}
            </div>

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <CategoryForm value={updatingName} setValue={(value) =>setUpditingName(value) }
                        handeleSubmit={handeleUpdateCategory}
                        buttonText="Update"
                        handeleDelete={handeleRemoveCategory}
                    />
                </Modal>


        </div>
        </div>
    )
}

export default CategoryList

    
