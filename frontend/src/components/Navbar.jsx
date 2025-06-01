import {
	Button,
	Container,
	Flex,
	HStack,
	Text,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { FaSquarePlus } from "react-icons/fa6";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container
			maxW={"1800"}
			px={4}
			bg={useColorModeValue("gray.200", "gray.900")}
		>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22px", sm: "28px" }}
					fontWeight="bold"
					textTransform="uppercase"
					textAlign="center"
					bgGradient="linear(to-r,rgb(129, 3, 187),rgb(255, 0, 187))"
					bgClip="text"
				>
					<Link to={"/"}> Cupcake Store </Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							<FaSquarePlus color="rgb(255, 0, 187)" fontSize={30} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};

export default Navbar;
