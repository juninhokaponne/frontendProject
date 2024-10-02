import { useEffect, useState, useMemo } from "react";
import { fetchAllMovies } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import animationData from "../../../assets/lotties/loading.json";
import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Progress,
} from "@chakra-ui/react";
import Lottie from "react-lottie";

interface MovieProps {
  title: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
}

const movieImages = [
  "https://m.media-amazon.com/images/I/612h-jwI+EL._AC_UF1000,1000_QL80_.jpg",
  "https://m.media-amazon.com/images/I/711xW80aSGL._AC_UF1000,1000_QL80_.jpg",
  "https://m.media-amazon.com/images/M/MV5BNWEwOTI0MmUtMGNmNy00ODViLTlkZDQtZTg1YmQ3MDgyNTUzXkEyXkFqcGc@._V1_.jpg",
];

const MovieList = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const cachedMovies = useMemo(() => {
    return movies.length > 0 ? movies : null;
  }, [movies]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      setProgress(0);

      if (cachedMovies) {
        setMovies(cachedMovies);
        setLoading(false);
        return;
      }

      let fetchInterval: ReturnType<typeof setInterval>;

      try {
        fetchInterval = setInterval(() => {
          setProgress((oldProgress) => {
            const newProgress = oldProgress + 10;
            if (newProgress >= 100) {
              clearInterval(fetchInterval);
            }
            return newProgress;
          });
        }, 100);

        const allMovies = await dispatch(fetchAllMovies() as any);
        setMovies(allMovies);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [dispatch, cachedMovies]);

  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Progress value={progress} size="sm" width="80%" />
        <Lottie
          options={{ loop: true, autoplay: true, animationData }}
          isClickToPauseDisabled
        />
        <Text marginTop={2}>{progress}% Carregado</Text>
      </Box>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        padding: "20px",
        overflowY: "auto",
        paddingBottom: "100px",
        marginBottom: "20px",
      }}
    >
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {movies.map((movie: MovieProps, index: number) => (
          <Card
            key={movie.title}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            style={{
              paddingBottom: "20px",
            }}
          >
            <CardHeader>
              <Image
                src={movieImages[index]}
                alt={movie.title}
                width={150}
                style={{
                  objectFit: "cover",
                }}
              />
            </CardHeader>
            <CardBody>
              <Stack spacing={3}>
                <Text fontSize="xl" fontWeight="bold">
                  {movie.title}
                </Text>
                <Text>{movie.opening_crawl}</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Diretor: {movie.director}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Produtor: {movie.producer}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Data do lançamento:{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default MovieList;
