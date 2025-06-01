import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
	const textColor = useColorModeValue("gray.800", "white");
	const bg = useColorModeValue("gray.200", "gray.900");

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const { deleteProduct, editProduct } = useProductStore();
	const toast = useToast();
	const handleDeleteProduct = async (id) => {
		const { success, message } = await deleteProduct(id);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Succes",
				description: "Product Deleted Successfully",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleEditProduct = async (id, updatedProduct) => {
		const { success, message } = await editProduct(id, updatedProduct);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				duration: 3000,
				isClosable: true,
			});
		} else {
			onClose();
			toast({
				title: "Success",
				description: "Product Modified Successfully",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow={"lg"}
			rounded={"lg"}
			overflow={"hidden"}
			transition={"all 0.3s"}
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image
				src={product.image}
				alt={product.name}
				h={48}
				w="full"
				objectFit="cover"
			/>

			<Box p={4}>
				<Heading as={"h3"} size={"md"} mb={2}>
					{product.name}
				</Heading>
				<Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
					${product.price}
				</Text>
				<HStack spacing={2}>
					<IconButton
						icon={<EditIcon />}
						color="rgb(255, 0, 187)"
						onClick={onOpen}
						aria-label=""
					/>
					<IconButton
						icon={<DeleteIcon />}
						color="rgb(129, 3, 187)"
						onClick={() => handleDeleteProduct(product._id)}
						aria-label=""
					/>
				</HStack>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay>
					<ModalContent>
						<ModalHeader>Update Product</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<VStack spacing={4}>
								<Input
									placeholder="Product Name"
									name="name"
									value={updatedProduct.name}
									onChange={(e) =>
										setUpdatedProduct({
											...updatedProduct,
											name: e.target.value,
										})
									}
								/>
								<Input
									placeholder="Price"
									name="price"
									type="number"
									value={updatedProduct.price}
									onChange={(e) =>
										setUpdatedProduct({
											...updatedProduct,
											price: e.target.value,
										})
									}
								/>
								<Input
									placeholder="Image URL"
									name="image"
									value={updatedProduct.image}
									onChange={(e) =>
										setUpdatedProduct({
											...updatedProduct,
											image: e.target.value,
										})
									}
								/>
							</VStack>
						</ModalBody>
						<ModalFooter>
							<Button
								color="rgb(129, 3, 187)"
								mr={3}
								onClick={() => handleEditProduct(product._id, updatedProduct)}
							>
								Update
							</Button>
							<Button variant="ghost" onClick={onClose}>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</ModalOverlay>
			</Modal>
		</Box>
	);
};

export default ProductCard;
