import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Image,
    FlatList,
    StyleSheet,
    NativeScrollEvent,
    NativeSyntheticEvent,
    useWindowDimensions,
} from "react-native";
import { colors } from "../../theme";

/* ================= TYPES ================= */

type Props = {
    images: string[];       // Array of image URLs
    height?: number;        // Slider height
    autoPlay?: boolean;     // Enable automatic sliding
    interval?: number;      // Time between slides (ms)
};

/* ================= COMPONENT ================= */

export function ImgSlider({
    images,
    height = 200,
    autoPlay = true,
    interval = 3000,
}: Props) {
    const { width } = useWindowDimensions();
    const flatListRef = useRef<FlatList>(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const ITEM_WIDTH = width; // full width slider

    /* ---------- Autoplay ---------- */
    useEffect(() => {
        if (!autoPlay || images.length <= 1) return;

        const timer = setInterval(() => {
            const nextIndex =
                activeIndex === images.length - 1 ? 0 : activeIndex + 1;

            flatListRef.current?.scrollToOffset({
                offset: nextIndex * ITEM_WIDTH,
                animated: true,
            });

            setActiveIndex(nextIndex);
        }, interval);

        return () => clearInterval(timer);
    }, [activeIndex, autoPlay, images.length, interval, ITEM_WIDTH]);

    /* ---------- Scroll ---------- */
    const onScrollEnd = (
        e: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const index = Math.round(
            e.nativeEvent.contentOffset.x / ITEM_WIDTH
        );
        setActiveIndex(index);
    };

    return (
        <View>
            {/* Slider */}
            <FlatList
                ref={flatListRef}
                key={width}                 // re-render on rotation
                data={images}
                horizontal
                pagingEnabled               // exact page snapping
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onScrollEnd}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => (
                    <View style={{ width: ITEM_WIDTH }}>
                        <Image
                            source={{ uri: item }}
                            style={[styles.image, { height }]}
                        />
                    </View>
                )}
            />

            {/* Pagination */}
            <View style={styles.dots}>
                {images.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            activeIndex === i && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    image: {
        width: "90%",
        alignSelf: "center",
        resizeMode: "cover",
        borderRadius: 16,
    },
    dots: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primaryContainer,
        marginHorizontal: 4,
    },
    activeDot: {
        width: 10,
        backgroundColor: colors.primary,
    },
});

/*
Usage Examples:

<ImgSlider
  images={[
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300"
  ]}
  height={250}
/>
*/
