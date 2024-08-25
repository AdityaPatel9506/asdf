import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions 
} from 'react-native';

const GRID_SIZE = 3;
const SHOW_DURATION = 700; // Duration to show the dot (700 milliseconds)

function Game(): React.JSX.Element {
  const [dotPosition, setDotPosition] = useState({row: -1, col: -1});
  const [score, setScore] = useState(0);
  const [chances, setChances] = useState(10);
  const [coins, setCoins] = useState(0);
  const [visibleCells, setVisibleCells] = useState(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false))
  );

  useEffect(() => {
    if (chances > 0) {
      const interval = setInterval(() => {
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        setDotPosition({row, col});
        setVisibleCells((prev) =>
          prev.map((r, rIdx) =>
            r.map((_, cIdx) => rIdx === row && cIdx === col)
          )
        );
        setTimeout(() => {
          setVisibleCells((prev) =>
            prev.map((r) => r.map(() => false))
          );
        }, SHOW_DURATION);
      }, SHOW_DURATION + 1000); // Show duration + 1 second to avoid overlap

      return () => clearInterval(interval);
    }
  }, [chances]);

  const handlePress = useCallback((row: number, col: number) => {
    if (visibleCells[row][col]) {
      setScore(score + 1);
      setCoins(coins + 1);
      setChances(chances - 1);
      setVisibleCells((prev) =>
        prev.map((r) => r.map(() => false))
      );
    } else {
      setChances(chances - 1);
    }
  }, [chances, coins, score, visibleCells]);

  const getMoreChances = () => {
    setChances(chances + 10);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerTop}>
        {/* Top Banner Ad */}
        <Text style={styles.bannerText}>Top Banner Ad</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.grid}>
          {[0, 1, 2].map((rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {[0, 1, 2].map((colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.cell,
                    {
                      backgroundColor:
                        visibleCells[rowIndex][colIndex] ? 'red' : 'white',
                    },
                  ]}
                  onPress={() => handlePress(rowIndex, colIndex)}
                  disabled={!visibleCells[rowIndex][colIndex]}
                />
              ))}
            </View>
          ))}
        </View>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.chances}>Chances: {chances}</Text>
        <Text style={styles.coins}>Coins: {coins}</Text>
        {chances === 0 && (
          <TouchableOpacity style={styles.button} onPress={getMoreChances}>
            <Text style={styles.buttonText}>Get 10 Chances</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.bannerBottom}>
        {/* Bottom Banner Ad */}
        <Text style={styles.bannerText}>Bottom Banner Ad</Text>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTop: {
    width: width,
    height: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  bannerBottom: {
    width: width,
    height: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  bannerText: {
    fontSize: 16,
    color: 'black',
  },
  grid: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  chances: {
    marginTop: 10,
    fontSize: 18,
  },
  coins: {
    marginTop: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Game;
