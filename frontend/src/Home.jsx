import React from 'react';
import { Box, Stack, Card, CardMedia, CardContent, Button, Typography } from '@mui/material';
import axios from 'axios';

const CustomCard = ({ amount, img, checkoutHandler }) => (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
        <CardMedia
            component="img"
            height="140"
            image={img}
            alt="product"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Price: ₹{amount}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => checkoutHandler(amount)}
            >
                Buy Now
            </Button>
        </CardContent>
    </Card>
);

const Home = () => {
    const checkoutHandler = async (amount) => {
        try {
            const { data: { key } } = await axios.get("http://localhost:7000/api/getkey");

            const { data: { order } } = await axios.post("http://localhost:7000/api/checkout", {
                amount
            });
            console.log(order);
            

            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Abhishek Sharma",
                description: "RazorPay Integration",
                image: "https://avatars.githubusercontent.com/u/121100297?v=4",
                order_id: order.id,
                callback_url: "http://localhost:7000/api/paymentverification",
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9999999999"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#121212"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Error during checkout: ", error);
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2
            }}
        >
            <CustomCard 
                amount={5000} 
                img={"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAwgMBIgACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAABgEDBAUHAv/EAEAQAAEDAwICCAQDBAgHAAAAAAEAAgMEBREGIRIxBxMiQVFhcYEUMpGhI0JSFSSxwTNicoKSosLhJTQ1U2PR8P/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDuKIiAiIgIiICIiAiplMoKosOtulvoGl1dW09OBz62UNUZuPShpGhyDc/iXD8tLG6T7gY+6CZJlcud0viteY9P6buNac4D34Df8nF98Kv7Z6TrsP3Ky0dtY7k6bmB7n+SDqGQvPWM4+Djbx4zw53wuXnQ2urv/ANd1m+CI84qPiHtlvB98rGp9I0+hdZ6aq4K2pqnVs0tLPLUEEnLDjl57+yDraIiAiIgIiICIiAiIgIiICK1UPkZBI+JnHI1hLWZxxHGwXFrZrHpH1nHK/TtNS08DHcD5I2sBjOM4LpDvz7moO25WBX3q125rnV1xpacN5mSZox91y5vR3rm8drUOrHxtO7oop5Hj/COBo+hW0oehmxRO47hWVtY/vJcGfwGUG2uHStpGiyGV8lY8DZtLC5+fR2A37rQO6ZPj8tsGnK6qJOAXkH6hnFj6qYW/QGk6Eh0VjpJHjk6ob1xB8Rx5x7KRRQxQt4YYmRtHcxoCDln7a6Urz/yNmgtsZ5OlaMgerz/IrwNA67u4Bv8ArF8TSe1FTSvII9G9WPsV1rCIOb0HQ5YYncdwqq2tf3l7w0fYKS2/QmlreWugsdE57eT5oxI4e7sqRog8RRRwsDImNY0DAa1uAPZesKqIChPSs0w2SgubR2rdc6ecnwaXcB+z1NlHtf0H7T0XeaQDLn0ry31AyPuEG/Y4Oa1w5OGQvS1Okq79p6XtNd3z0cT3eRLRkfXK2yAiIgIiICIiAiIgIiIKFcs6OGmxdI+qrActgmf8TTg+pO3tIB/cXVFyzWLhYulzTl12bFcGGmkd5g8P+tiDqaIiAiIgIiICIiAiIgK3URCenliPKRhafcK4h5IId0USk6PgpXfNRTzUxHhwvOB9FMVCtB/umodW2s7CK4/EMH9WVod/HKmqAiIgIiICIiAiIgIiIC5x06W99RpOC4U+Wz2+qbK1w5gHs59iWn+6ujrU6qtovGnLlby3PxFO9jR4nG33QZNlr2XS00VfH8tTAyUeXEAcLNUG6G7h8bommiLsupXuiPkOY+xCnKAiIgIiICIiAiIgIiIIVB+49LdS3GGXK0tf6uifj+D/ALKaqF6s/c9a6SuH65pqR58nsOPuFMwgqiIgIiICIiAiIgIiICIiDmnR039i641PYScRPk+JgB2wM529ntH91dLXN9S/8H6VLJcfljr4+oee7Py/6mro4QVREQEREBFTIVmqq6aki6yqnjhZ+p7gAgvoofc+kKzUZLKYy1kucARNw3Pqf5ZWpl1Hqq6ksoaJlvjPe/d4HuM/5UHQppY4YzJM9sbG7lz3YAUcumubHQBwZUGqePywDiH+LkojJYH1U3W327TVcoPyAkhvtucf4FkMktVrA6iGKJ/dI85ecem/3QaHVuuJbzV0EbaWKnioq2Op+cvl7Ox8ANiV2Ohq4K6khrKWRslPOwSRvachzSMghcU1BdaGeqbK+lhfUh4bGZwA1/jgDOT6/VSWw6ribhsp+AkGG4k7LHHkOfL3+pQdNyFVamivMcmGVI6p/wCr8p/9LatcHNBBBB7wgqiZRAREQEREBERAREQc/wCmSifJp2muMH9Pb6psjXeAO38eE+ym1sq2V9upqyP5KiJsg9xlYup7eLpp64UWMulgcG/2sbfdRDo/1Za6PRdKLnXQwPp3Oi4Hu7RAORtzOx8EHQ1TK55X9KdI6X4exW2qrZj8pe3hB8wBlx+gWvlq9dX/ACOtZbKc8wwlrse2XfwQdIr7pQW5nHX1cMA/8jwD9FE7l0l2qKTqbZTVFfMfl4RwtPp3n2Cj9Po+3Qydbda6aun5uHESSfbJ9y5ZslfaLJGG08FPTNfkDDQ578c9m7u9yUFJLzrK9Etpoo7bEe/HaA+5+wWI3TED5jLeblPWzn5hxFx9OZP3HorVx1PJ1cuI39VHljHuc3qy8cgGMPIjOD/utRNcK+ofRPMn4Mjhjhl+HDsn5cHvHLBOHbYznYJN8VabOx3wsEMOOyXY4nk+GG7779+Frq7U4Evw47DHMBY+UhrDn5ctHj54UchET5rhSgmVu7gwwCBmQTtxcwcfkdtz35Lz1hhbQ075nUM4OWCnZ12WncHi5gHvDeIeSDOqLhc5YpHOeaV9Me31mGxO3OAWjJHvsfI7LEY91QKaphbNUxSgiVkEnDGcbkcLtzjnvjyKpVcNFJUVFRGKA4LYqlruuJxgOAYCRg57iPornwclRPTmSA1B6rijuHWBoc0fK7gBGcAHbY+6DWERSOnFPI2drHZJpAWPaD3uc7ct35b+qvQU8kTM07W9W0bxsbxzuG27N+7xB9lWEQ3kTMdMbjNHKXFtPG6INHeSMDjyTzwCPHx3Nt0zdqljuvEdtZnLXwk9aR4OOSfbi9kFu2XmvtwHC4Gnzl8NU7MoA54a0Z9gPUBTbTmpmVsTpKB0rWNODHKwge3cfZYNNpi3xPjmqYm1VSzGZ5WjieRyJxsT54yty2NrRhrQB4IJBR3eGfDZQYX/ANbkfQrZAg8lDS3yWTSXCelIa08TP0O5f7IJUiwaO5wVRDclkn6Xd/oe9ZwQEREBERAREQUK4JfNKz0moa6ngpp5W9c58QYzDeBxyO0cDbOOZ5Lvi1l4oHVLY5YhmSPOWZwHg/8A2UHPLK+TTdpLLjHSxB8nYLWl5O2cHAAcdjuVZu+p5HUDKqD8WNzzGRM8tEbs7Dgb4jke9SytooqymkpqmPMbxhzc4P8At5Lmd1tlRp+onpoJWUsVRu2fi43TMBzvnYEH+zv3oMurudXUxMq6WXjpajLWwzOEDG5I7LjkHPLDs8u/uWNGIqe8GjinlDcO4qYs/CDiB2JHc+7AfgHYFWRJTVUcEdzjc9sTDGa2Z+Bj8pcMgP4fAE581cdLUCENqHTXKGpDXQR0gLRHjbsOxkYHZLSANxtsgsF/7Po5+vYKH4kjqpKd3WyytzjBw4Akc8hwOeYOVenpmiSndX0zKmiazgFfM/Ly0jLOzjcgA9lzcjcLJp6eWkqXU9LNTmgja6V1I0cU0gI3GObXgeDu7ICpbLdJWwVrrHTyPqZR231w44pY88uQZxjY7gj0KDFBlqKEzh014ppnjHE4xNhI5jJOWbADGeEj0Vs3Gmo52wQVZmpCwgUFNH474L+XEDjtN4uXmQpDR6CqqsNffri+XA2hiOGjy8B7AKRW6xW61t4aSkjjPIvxlx9XHdBA7dab/VNc2go222nmcHvlqXl73HnnfO+/MNB81KodNwvLJ6+WSaqODK+MmJsrhycWg7H0ICkHCEIQWaaOGAfhwsj4iXOLGhu55k4WUACBhWC1VYXA9kE+XigvYVMK41pdjY5Pcsuntk0py5vA3xKDX4V6nop6jHVx4HieS3tPbYIcEt43eLlmNGBgckGrpLMyN7XzOLnDcAbDK2qIgIiICIiAiIgIiINbcqQH8aMb/mx3qP3e2Q3OjdBJhrhvFKACY3fqGVL3uAG609VGxsv4RHCe7wQccuVqdDXvpH0M9dWRnDWEOax2e8cO5Hq4KSQ6Xuc8kE1NVPtdLhsgpYwPwH/mAxs4bczk77qdBgBzjJ8Sq8O2EGkpNM2ulqvim0wMwPE3tHhYf6rScN9uS3DY2tADWgDyGFcwmEHnHgvEkYcOW6u4TBQYDmOacOCCNzuQ+q9VlyoqQfjzML/0g5K1kmoYi7ETQ1viSg2sdIXkYaXHyWwp7Zn+leG+Q5qNR3wnk4AeSy4rw847RKCWQ08MPyNGfE7lXgo5BdXnGSs+K4F3NBtUWNHUtcr7Xh3JB6RUyqoCIiAiIgIiICIiDxIwOC0d2paiMGWDfC36oRxDBQRyhqmVcPENnt2e3wKyQF7q7TwVHxlAA2Xk+MnsyD+RVqWYRNy6Odx/SyFzj9gg94XiV8cTC+V7GMHNznYA91q6ubUVTmO02hkAO3X1rwMejB/MhambQN4u0gkvl4Mg59Wz5R6Dkg93XXNqo8x0jnVko/7Z7P1UXrtU3i5ksaRBE78kQxt68ypvRdHNrpwOse+Qjywt1TaXtdOBwwZx3lByimo6yZwIY4578Lb0lirJMcTHD2XUYrfSxfJCz6K+2JjflYB7IIDSabnIGWlban0+9oGRhSoAeCqg0sNn4cZWXHb2t71nogx2UzGq62MN5L2iCgGFVEQEREBERAREQEREBERAVERAaqoiAiIgIiICIiAiIgIiICIiAiIg/9k="} 
                checkoutHandler={checkoutHandler} 
            />
            <CustomCard 
                amount={3000} 
                img={"http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"} 
                checkoutHandler={checkoutHandler} 
            />
        </Box>
    );
};

export default Home;
