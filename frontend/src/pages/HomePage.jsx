import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log("products: ", products);

	return (
		<Container maxW="container.xl" py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight="bold"
					textAlign="center"
					bgGradient="linear(to-r,rgb(129, 3, 187),rgb(255, 0, 187))"
					bgClip="text"
				>
					Current Products
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>

				{products.length === 0 && (
					<Text
						fontSize="xl"
						fontWeight="bold"
						textAlign="center"
						color={"gray.500"}
					>
						No products found{" :( "}
						<Link to={"/create"}>
							<Text
								as={"span"}
								color="rgb(226, 45, 199)"
								_hover={{ textDecoration: "underline" }}
							>
								Create A Product
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};

export default HomePage;
